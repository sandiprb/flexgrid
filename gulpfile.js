var gulp = require('gulp');
var gzip = require('gulp-gzip');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var atImport = require('postcss-import');
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');
var connect = require('gulp-connect');

//global pcss processes
var processors = [
atImport({path: ['./postcss/', './demo/pcss/']}),
require('postcss-mixins'),
require('postcss-each'),
require('postcss-for'),
require('postcss-simple-extend'),
require('postcss-simple-vars'),
require('postcss-nested'),
require('postcss-calc'),
require('css-mqpacker'),
require('postcss-discard-empty'),
autoprefixer({browsers: ['last 2 version']})

];

//flexgrid build
gulp.task('build', function() {
	return gulp.src('./postcss/[^_]*.pcss')
	.pipe(postcss(processors))
	.pipe(rename({extname: '.css'}))
	.pipe(gulp.dest('./dest/'))
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('./dest/'))
	.pipe(gzip())
	.pipe(gulp.dest('./dest/'))
	});

//demo build task
gulp.task('demo', function() {
	return gulp.src('./demo/pcss/[^_]*.pcss')
	.pipe(postcss(processors))
	.pipe(rename({extname: '.css'}))
	.pipe(connect.reload())
	.pipe(gulp.dest('./demo/css'))
	});

//livereload task
gulp.task('livereload', function() {
	connect.server({
		livereload: true
		});
	});

gulp.task('watch:demo', ['build', 'demo', 'livereload'] , function () {
	gulp.watch(
		['./postcss/*.pcss', './demo/pcss/*.pcss', './demo/index.html'],
		['build', 'demo']);
	});

gulp.task('default', ['build'] , function () {
	gulp.watch(['./postcss/*.pcss'], ['build']);
	});
