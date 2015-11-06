var gulp = require('gulp');
var karma = require('karma').server;
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var path = require('path');
var plumber = require('gulp-plumber');
var runSequence = require('run-sequence');
var jshint = require('gulp-jshint');
var ghPages = require('gulp-gh-pages');


var rootDirectory = path.resolve('./');
var sourceDirectory = path.join(rootDirectory, './src');

var sourceFiles = [
  path.join(sourceDirectory, '/**/*.js')
];


gulp.task('build', function() {
  gulp.src(sourceFiles)
    .pipe(plumber())
    .pipe(concat('md-mouse-hold.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(gulp.dest('../md-mouse-hold-site/src/lib/'))
    .pipe(uglify())
    .pipe(rename('md-mouse-hold.min.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(gulp.dest('../md-mouse-hold-site/src/lib/'));
});

gulp.task('process-all', function (done) {
  runSequence('jshint', 'build', done);
});


gulp.task('watch', function () {
  gulp.watch(sourceFiles, ['process-all']);
});

gulp.task('jshint', function () {
  return gulp.src(sourceFiles)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('default', function () {
  runSequence('process-all', 'watch');
});
