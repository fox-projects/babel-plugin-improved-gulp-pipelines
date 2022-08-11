import path from 'path'
import url from 'url'
import fs from 'fs'
import test from 'ava'
import { transformAsync } from '@babel/core'
import plugin from '../index.js'

test('testing for match', async (t) => {
	const input = await fs.promises.readFile(
		path.join(
			path.dirname(url.fileURLToPath(import.meta.url)),
			'fixtures/one.in.js',
		),
		{ encoding: 'utf8' },
	)
	const output = await fs.promises.readFile(
		path.join(
			path.dirname(url.fileURLToPath(import.meta.url)),
			'fixtures/one.out.js',
		),
		{ encoding: 'utf8' },
	)
	try {
		const { code } = await transformAsync(input, {
			plugins: [plugin],
			ast: true,
		})
		t.is(output, code)
	} catch (err) {
		console.error(err)
	}
})
