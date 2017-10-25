var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var uncss = require('gulp-uncss');
var clean = require('gulp-clean');
 
gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
 
gulp.task('css', function () {
  return gulp.src('css/**/*.css')
    .pipe(concatCss('style.css'))
    .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
    .pipe(cleanCSS())
    .pipe(uncss({
        html: ['./app/index.html', './app/users/*.html','./app/login/*.html']
    }))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('app/css/'));
});

gulp.task('clean', function () {
  return gulp.src(['./css/*.css', './app/css/*.css'], {read: false})
    .pipe(clean());
});

gulp.task('watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./css/**/*.css', ['css']);
});