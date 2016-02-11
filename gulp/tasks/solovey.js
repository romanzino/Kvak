import gulp from 'gulp';
import watch from 'gulp-watch';
import rename from 'gulp-rename';
import stylus from 'gulp-stylus';
import rupture from 'rupture';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import mergeRules from 'postcss-merge-rules';
import flexBugsFixes from 'postcss-flexbugs-fixes';
import minifyCSS from 'gulp-minify-css';
import combineMQ from 'gulp-combine-mq';

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
                browsers: ['last 2 versions', 'ie >= 10', 'android >= 2.3']
            }),
            mergeRules(),
            flexBugsFixes()
        ]))
        .pipe(rename('solovey.css'))
        .pipe(gulp.dest('./dist/css/'));
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
    gulp.watch('./src/stylus/**/*.styl', ['solovey:stylus']);
});

gulp.task('default', ['solovey:stylus', 'solovey:css-build', 'solovey:watch']);