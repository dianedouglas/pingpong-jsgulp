var gulp = require('gulp');
var mocha = require('gulp-mocha');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var rename = require('gulp-rename');
var utilities = require('gulp-util');
var del = require('del');

var buildProduction = true;
if (utilities.env.develop === true) {
	buildProduction = false;
}

gulp.task('runTests', function(){
	return gulp.src('test/pingpong-tests.js').pipe(mocha({reporter: 'nyan'}));
});

gulp.task('watchJs', function(){
  gulp.watch(['js/*.js', 'test/*.js'], ['runTests', 'jsBrowserify']);
});

//take all frontend js files (inside js folder ending in -interface.js)
//concatinate them into one file: ./build/js/allConcat.js
gulp.task('concatInterface', function() {
  return gulp.src('./js/*-interface.js')
    .pipe(concat('allConcat.js'))
    .pipe(gulp.dest('./tmp'));
});

//take that concatinated file, browserify it and rename it as ./build/js/app.js
gulp.task('jsBrowserify', ['concatInterface'], function() {
  return browserify({ entries: ['./tmp/allConcat.js'] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'));
});

//on a production build, you also want to minify it.
gulp.task("minifyScripts", ["jsBrowserify"], function(){
  return gulp.src("./build/js/app.js")
    .pipe(uglify())
    .pipe(gulp.dest("./build/js"));
});

gulp.task("build", function(){
	if (utilities.env.develop) {
		gulp.start('jsBrowserify');
	} else {
		gulp.start('minifyScripts');
	}
});

gulp.task("clean", function(){
	return del(['build', 'tmp']);
});

/*
correct package.json and add browsersync w/ dev server.
live reloading based on watching and replacing files that change
*/
