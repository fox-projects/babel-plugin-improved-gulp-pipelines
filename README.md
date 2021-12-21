# babel-improved-gulp-pipelines

Transpiles function calls that extend from a `gulp.src()` or `src()` call to add `.pipe()`

## Example

### Input

```js
gulp
	.src('style.css')
	.plumber()
	.postcss()
	.rename('style.min.css')
	.gulp.dest('dist')
```

### Output

```js
gulp
	.src('style.css')
	.pipe(plumber())
	.pipe(postcss())
	.pipe(rename('style.min.css'))
	.pipe(gulp.dest('dist'))
```

## Usage

```json
{
	"plugins": ["babel-plugin-improved-gulp-pipelines"]
}
```

## Contributing

```sh
git clone https://github.com/hyperupcall/babel-improved-gulp-pipelines
cd babel-improved-gulp-pipelines
pnpm i -r
pnpm publish
```
