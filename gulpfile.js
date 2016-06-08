var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('vendor', function() {
    return gulp.src([
        'bower_components/jquery/dist/jquery.min.js'
    ])
        .pipe(uglify())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('bundle', function() {
    return gulp.src('client.js')
        .pipe(uglify())
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('styles', function() {
    return gulp.src('bower_components/bootstrap/dist/css/bootstrap.min.css')
        .pipe(concat('style.css'))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('default', ['vendor', 'bundle', 'styles']);