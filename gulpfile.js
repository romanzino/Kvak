var gulp = require('gulp');
var watch = require('gulp-watch');
var stylus = require('gulp-stylus');
var jade = require('gulp-jade');
var rupture = require('rupture');

//Compile solovey
gulp.task('solovey:stylus', function () {
    gulp
        .src('./src/index.styl')
        .pipe(stylus({
            'include css': true,
            use: [rupture()]
        }))
        .pipe(gulp.dest('./css'));
});

gulp.task('solovey:watch', function () {
    gulp.watch('./src/**/*.styl', ['solovey:stylus']);
});

//Compile docs
gulp.task('docs:jade', function() {
    gulp.src('./docs/src/jade/*.jade')
    .pipe(jade({
        pretty: true
    }))
    .pipe(gulp.dest('./docs'))
});

gulp.task('docs:stylus', function () {
    gulp
        .src('./docs/src/stylus/demo.styl')
        .pipe(stylus({
            use: [rupture()]
        }))
        .pipe(gulp.dest('./docs/css'));
});

gulp.task('docs:watch', function() {
    gulp.watch('./docs/src/stylus/**/*.styl', ['docs:stylus']);
    gulp.watch('./docs/src/jade/**/*.jade', ['docs:jade']);
});


gulp.task('default', ['solovey:stylus', 'solovey:watch']);
gulp.task('docs', ['docs:watch', 'docs:jade', 'docs:stylus']);