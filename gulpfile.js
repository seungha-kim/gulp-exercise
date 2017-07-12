const gulp = require('gulp');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

gulp.task('default', function (callback) {
  runSequence(
    'clean',
    ['concat', 'copy', 'sass'],
    callback
  );
})

// gulp-concat
gulp.task('concat', function () {
  return gulp.src('./app/**/*.js')
    .pipe(concat('build.js'))
    .pipe(gulp.dest('./dist'));
})

// simple copy
gulp.task('copy', function () {
  return gulp.src('./app/*.html')
    .pipe(gulp.dest('./dist'));
})

// gulp-clean
gulp.task('clean', function () {
  return gulp.src('./dist/**/*')
    .pipe(clean());
})

// gulp-sass
gulp.task('sass', function () {
  return gulp.src('./app/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
})

gulp.task('serve', ['default'], function() {
  browserSync.init({
    server: './dist'
  });

  gulp.watch('./app/**/*.scss', ['sass']);
  gulp.watch('./app/*.html', ['copy']).on('change', browserSync.reload);
  gulp.watch('./app/**/*.js', ['concat']).on('change', browserSync.reload);
})