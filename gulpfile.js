var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('minify-client', () => {
    gulp.src('client/app.js')
        .pipe(uglify())
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('styles', () => {
    gulp.src(['client/**/*.css'])
        .pipe(concat('style.css'))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('watch-files', () => {
    gulp.watch('client/**/*.js', ['minify-client']);
    gulp.watch('client/**/*.css', ['styles']);
});

gulp.task('default', ['minify-client', 'styles']);
gulp.task('watch', ['minify-client', 'styles', 'watch-files']);
