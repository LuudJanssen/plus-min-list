import gulp from 'gulp';
import less from 'gulp-less';
import autoprefixer from 'gulp-autoprefixer';
import path from 'path';
import Logger from '../logger';

let logger = new Logger('ClientBuilder');

const ROOT = path.dirname(require.main.filename);

export default class ClientBuilder {
  build() {
    logger.info('Building started');
    this._moveIndex();
    this._buildStyle();
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
}
