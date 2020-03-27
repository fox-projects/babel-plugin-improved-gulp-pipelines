function findRoot(t, callExpression) {
  const { callee, args } = callExpression

  // only act on callee `Expression`s that are `MemberExpression`s
  if (!t.isMemberExpression(callee)) return

  const { object, property, computed } = callee

  // ignore already transformed builder patterns
  // could causes races if visitors visit concurrently
  // if (property.name === 'pipe') return

  // if property is computed (eg. a[b]), return
  if (computed) return

  // test if we are at the root
  if (
    (object.name === 'gulp' && property.name === 'src') ||
    property.name === 'src'
  ) {
    console.log(object.name, property.name)
    return true
  }

  // only act on object (MemberExpression) `Expression`s that are `CallExpression`s
  // i.e. object can be an `Expression`, but we are only looking for `CallExpression`s
  if (!t.isCallExpression(object)) return

  const nestedCallExpression = object
  return findRoot(t, nestedCallExpression)
}

export default function ({ types: t }) {
  return {
    name: 'babel-plugin-improved-gulp-pipelines',
    visitor: {
      CallExpression(path) {
        const { node } = path
        const hasRoot = findRoot(t, node)

        if (!hasRoot) return

        let { callee, args } = node
        // TODO: use ??
        args = args || []

        // only act on callee `Expression`s that are `MemberExpression`s
        if (!t.isMemberExpression(callee)) return

        const { object, property, computed } = callee

        const suffix = object

        // path.replaceWith(
        //   object, t.identifier('pipe2')
        // )
        // ulp.rc("src'")
        const gulpSrc = t.callExpression(
          t.memberExpression(
            t.identifier('ulp'),
            t.identifier('rc')
          ),
          [ t.stringLiteral('src') ]
        )

        //
        const piped = t.callExpression(
          t.identifier('pipe'),
          [ t.stringLiteral(property.name) ]
        )

        path.replaceWith(
          t.memberExpression(
            gulpSrc,
            t.identifier('pipe')
          )
        )
      }
    }
  }
}
