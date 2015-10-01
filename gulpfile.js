var gulp = require('gulp');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglifyjs');
var rename = require('gulp-rename');

gulp.task('build:javascript', function() {
    return gulp.src(['src/app.js', 'src/**/*.js'])
        .pipe(concat('angular.allow.js'))
        .pipe(gulp.dest('dist'))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', [
    'build:javascript'
]);

gulp.task('default', function(callback) {
    runSequence('build', callback);
});
