import gulp from 'gulp';
import less from 'gulp-less';
import autoprefixer from 'gulp-autoprefixer';
import path from 'path';
import logger from '../logger';

const ROOT = path.dirname(require.main.filename);

export default class ClientBuilder {
  build() {
    this._log('Building started');
    this._moveIndex();
    this._buildStyle();
    this._log('Client build complete')
  }

  _moveIndex() {
    gulp.src(['src/client/index.html'])
      .pipe(gulp.dest('build'));

    this._log('Index file moved to build');
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

    this._log('Imported less files, prefixed them and moved to build');
  }

  _log(message = '') {
    logger.info('ClientBuilder:', message);
  }
}
