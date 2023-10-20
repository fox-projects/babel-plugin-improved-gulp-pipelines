const { src, dest } = require('gulp')
const plumber = require('gulp-plumber')
const sourcemaps = require('gulp-sourcemaps')
const postcss = require('gulp-postcss')
const rename = require('gulp-rename')

async function minifyCss() {
	src('style.css')
		.plumber()
		.sourcemaps.init()
		.postcss()
		.rename('style.min.css')
		.sourcemaps.write('.')
		.dest('.')
}

exports.default = minifyCss
exports.minifyCss = minifyCss
