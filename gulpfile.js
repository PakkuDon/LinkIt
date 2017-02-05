var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('minify-client', function() {
    gulp.src('client.js')
        .pipe(uglify())
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('default', ['minify-client']);
gulp.task('watch', function() {
  gulp.watch('client.js', ['minify-client']);
});
