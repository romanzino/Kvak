import gulp from 'gulp';
import watch from 'gulp-watch';
import rename from 'gulp-rename';
import stylus from 'gulp-stylus';
import babel from 'gulp-babel';
import rupture from 'rupture';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import mergeRules from 'postcss-merge-rules';
import flexBugsFixes from 'postcss-flexbugs-fixes';
import minifyCSS from 'gulp-minify-css';
import combineMQ from 'gulp-combine-mq';
import sourcemaps from 'gulp-sourcemaps';

//Compile solovey
gulp.task('solovey:stylus', () => {
    gulp
        .src('./src/stylus/index.styl')
        .pipe(stylus({
            'include css': true,
            use: [rupture()]
        }))
        .pipe(postcss([
            autoprefixer({
                browsers: ['last 2 versions', 'ie >= 10', 'android >= 4']
            }),
            mergeRules(),
            flexBugsFixes()
        ]))
        .pipe(rename('solovey.css'))
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('solovey:js', () => {
    gulp
        .src('./src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js/'))

});

gulp.task('solovey:css-build', ['solovey:stylus'], () => {
    gulp
        .src('./dist/css/solovey.css')
        .pipe(combineMQ())
        .pipe(minifyCSS())
        .pipe(rename('solovey.min.css'))
        .pipe(gulp.dest('./dist/css/'))

});

gulp.task('solovey:watch', () => {
    gulp.watch('./src/stylus/**/*.styl', ['solovey:css-build']);
    gulp.watch('./src/js/**/*.js', ['solovey:js']);
});

gulp.task('default', ['solovey:js', 'solovey:css-build', 'solovey:watch']);