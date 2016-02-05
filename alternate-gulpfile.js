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
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

var buildProduction = true;
if (utilities.env.develop === true) {
	buildProduction = false;
}

gulp.task('runTests', function(){
	return gulp.src('test/pingpong-tests.js').pipe(mocha({reporter: 'nyan'}));
});

// gulp.task('watchJs', function(){
//   gulp.watch(['js/*.js', 'test/*.js'], ['runTests', 'jsBrowserify']);
// });

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

gulp.task("buildJs", function(){
	if (utilities.env.develop) {
		gulp.start('jsBrowserify');
	} else {
		gulp.start('minifyScripts');
	}
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./",
						index: "pingpong.html"
        }

    });
		//set up watchers for files that say 'when these change, reload'
		gulp.watch(['js/*.js', 'test/*.js'], ['js-reload']);
		gulp.watch(['pingpong.html'], ['html-reload']);
});

//reload tasks have any build tasks listed as dependencies before call to reload.
gulp.task('js-reload', ['runTests', 'buildJs'], browserSync.reload);
gulp.task('html-reload', browserSync.reload);







//full build task could include css etc.
gulp.task("build", ["clean"], function(){
	if (utilities.env.develop) {
		gulp.start('jsBrowserify');
	} else {
		gulp.start('minifyScripts');
	}
});

gulp.task("clean", function(){
	return del(['build', 'tmp']);
});
