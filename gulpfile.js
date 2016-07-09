let gulp = require('gulp');
let babel = require('gulp-babel');
let util = require('gulp-util');
let webpack = require('webpack-stream');
let webpackConfig = require('./webpack.config.js');
let logger = require('./src/cli/logger');

gulp.task('watch', ['build'], function () {
  logger.info('WATCHING APPLICATION');

  gulp.watch(['src/**/*.js'], ['build']);
});

gulp.task('webpack', function () {
  gulp.src(['src/**/*.js', 'index.js'])
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('dist'));
});
