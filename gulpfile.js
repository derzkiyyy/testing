var gulp        = require('gulp'),
	browserSync = require('browser-sync').create(),
	sass        = require('gulp-sass'),
	concatCss = require('gulp-concat-css'),
	rename = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css'),
    twig = require('gulp-twig'),
    newer = require('gulp-newer');

// Static Server + watching scss/html files
gulp.task('serve', ['sass','templates'], function() {
    browserSync.init({
        server: "./app"
    });
    gulp.watch("app/twig/*.html", ['templates']);         
    gulp.watch("app/sass/*.sass", ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

gulp.task('templates', function() {
    return gulp.src('app/twig/*.html') 
        .pipe(newer('app'))
        .pipe(twig())
        .pipe(gulp.dest('app'))
});

gulp.task('sass',function() {
    return gulp.src('app/sass/*.sass')
        .pipe(newer('app')) 
        .pipe(sass())        
        .pipe(concatCss("main.css"))
        .pipe(minifyCSS())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);