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
import webpack from 'webpack';
import source from 'vinyl-source-stream';
import paths from '../paths';
import gutil from 'gulp-util';

//Compile solovey
gulp.task('solovey:stylus', () => {
    return gulp
        .src(`${paths.src.stylus}/index.styl`)
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
        .pipe(gulp.dest(paths.dist.css));
});



gulp.task('solovey:js', () => {
    let Compiler = webpack({
        devtool: '#source-map',
        entry: {
            loadingScreen: [`${paths.src.js}/loadingscreen.js`],
            modal: [`${paths.src.js}/modal.js`],
            blackout: [`${paths.src.js}/blackout.js`]
        },
        output: {
            path: paths.dist.js,
            filename: '[name].bundle.js',
        },
        module: {
            loaders: [
                {
                    test: /\.js?$/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                }
            ]   
        }
    });

    return Compiler.run((err, stats) => {
        if (err) {
            throw new gutil.PluginError('webpack', err);   
        }
    });
});

gulp.task('solovey:js-build', ['solovey:js'], () => {
/*
    let Compiler = webpack({
        devtool: '#source-map',
        entry: `${paths.src.js}/solovey.js`,
        output: {
            path: paths.dist.js,
            filename: 'solovey.min.js'
        },
        module: {
            loaders: [
                {
                    test: /\.js?$/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                }
            ]   
        },
        plugins: [
           // new webpack.optimize.UglifyJsPlugin()
        ]
    });

    return Compiler.run((err, stats) => {
        
    });*/
});

gulp.task('solovey:css-build', ['solovey:stylus'], () => {
    return gulp
        .src(`${paths.dist.css}/solovey.css`)
        .pipe(combineMQ())
        .pipe(minifyCSS())
        .pipe(rename('solovey.min.css'))
        .pipe(gulp.dest(paths.dist.css))

});

gulp.task('solovey:watch', () => {
    gulp.watch(`${paths.src.stylus}/**/*.styl`, ['solovey:css-build']);
    gulp.watch(`${paths.src.js}/**/*.js`, ['solovey:js-build']);
});

gulp.task('default', ['solovey:js-build', 'solovey:css-build', 'solovey:watch']);