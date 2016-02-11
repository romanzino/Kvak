import gulp from 'gulp';
import watch from 'gulp-watch';
import stylus from 'gulp-stylus';
import jade from 'gulp-jade';
import rupture from 'rupture';

gulp.task('docs:jade', () => {
    gulp.src('./docs/src/jade/*.jade')
    .pipe(jade({
        pretty: true
    }))
    .pipe(gulp.dest('./docs'))
});

gulp.task('docs:stylus', () => {
    gulp
        .src('./docs/src/stylus/demo.styl')
        .pipe(stylus({
            use: [rupture()]
        }))
        .pipe(gulp.dest('./docs/css'));
});

gulp.task('docs:watch', () => {
    gulp.watch('./docs/src/stylus/**/*.styl', ['docs:stylus']);
    gulp.watch('./docs/src/jade/**/*.jade', ['docs:jade']);
});

gulp.task('docs', ['docs:jade', 'docs:stylus', 'docs:watch']);