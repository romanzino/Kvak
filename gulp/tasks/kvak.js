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

gulp.task('kvak:stylus', () => {
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
        .pipe(rename('kvak.css'))
        .pipe(gulp.dest(paths.dist.css));
});

gulp.task('kvak:js', () => {
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

gulp.task('kvak:js-build', ['kvak:js'], () => {
/*
    let Compiler = webpack({
        devtool: '#source-map',
        entry: `${paths.src.js}/kvak.js`,
        output: {
            path: paths.dist.js,
            filename: 'kvak.min.js'
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

gulp.task('kvak:css-build', ['kvak:stylus'], () => {
    return gulp
        .src(`${paths.dist.css}/kvak.css`)
        .pipe(combineMQ())
        .pipe(minifyCSS())
        .pipe(rename('kvak.min.css'))
        .pipe(gulp.dest(paths.dist.css))

});

gulp.task('kvak:watch', () => {
    gulp.watch(`${paths.src.stylus}/**/*.styl`, ['kvak:css-build']);
    gulp.watch(`${paths.src.js}/**/*.js`, ['kvak:js-build']);
});

gulp.task('default', ['kvak:js-build', 'kvak:css-build', 'kvak:watch']);