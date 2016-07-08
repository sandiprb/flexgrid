var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var atImport = require('postcss-import');
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');

gulp.task('build', function() {
	var processors = [
	atImport({
		path: ['postcss/']
		}),
	require('postcss-mixins'),
	require('postcss-simple-vars'),
	require('postcss-nested'),
	require('css-mqpacker'),
	autoprefixer({browsers: ['last 2 version']})
	];
	return gulp.src('./postcss/[^_]*.pcss')
	.pipe(postcss(processors))
	.pipe(rename({extname: '.css'}))
	.pipe(gulp.dest('./dest/'))
	});

gulp.task('compress', ['build'] , function () {
	return gulp.src('./dest/flexgrid.css')
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('./dest/'))
	});

gulp.task('default', ['build', 'compress'] , function () {
	gulp.watch(['./postcss/*.pcss'], ['build']);
	});
