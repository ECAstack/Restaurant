var gulp = require('gulp');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync');
var pug = require('gulp-pug');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: "./destination"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('pug', function() {
  gulp.src('source/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('destination/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('style', function(){
  gulp.src(['source/style/*.sass'])
    .pipe(sass())
    .pipe(autoprefixer('last 5 versions'))
    .pipe(gulp.dest('destination/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cleanCSS())
    .pipe(gulp.dest('destination/assets/css'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('default', ['pug', 'style', 'browser-sync'], function(){
  gulp.watch("source/style/**/*.sass", ['style']);
  gulp.watch("source/**/*.pug", ['pug']);
});
