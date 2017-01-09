import gulp from 'gulp';
import less from 'gulp-less';
import autoprefixer from 'gulp-autoprefixer';
import browserify from 'browserify';
import stringify from 'stringify';
import mkdirp from 'mkdirp';
import fs from 'fs';
import path from 'path';
import Logger from '../logger';

let logger = new Logger('ClientBuilder');

const ROOT = path.dirname(require.main.filename);

export default class ClientBuilder {
  build() {
    logger.info('Building started');
    this._moveIndex();
    this._buildStyle();
    this._buildScripts();
    logger.info('Client build complete')
  }

  _moveIndex() {
    gulp.src(['src/client/index.html'])
      .pipe(gulp.dest('build'));

    logger.info('Index file moved to build');
  }

  _buildStyle() {
    gulp.src(['src/client/less/public/*.less'])
      .pipe(less({
        paths: [
          ROOT,
          path.join(ROOT, 'node_modules')
        ]
      }))
      .pipe(autoprefixer())
      .pipe(gulp.dest('build/css'));

    logger.info('Imported less files, prefixed them and moved to build');
  }

  _buildScripts() {
    let bundleDestination = 'build/js/bundle.js';

    mkdirp(path.dirname(bundleDestination), function () {
      let bundleDestinationStream = fs.createWriteStream('build/js/bundle.js');

      bundleDestinationStream.on('open', function () {
        browserify('src/client/js/index.js')
          .transform('babelify', {
            presets: ['es2015']
          })
          .transform(stringify , {
            appliesTo: { includeExtensions: ['.html'] },
            minify: true
          })
          .bundle()
          .pipe(bundleDestinationStream);
      });

      bundleDestinationStream.on('finish', function () {
        logger.info('Transpiled and bundled client javascript');
      });
    });
  }
}
