import gulp from 'gulp';
import logger from '../logger';

export default class ClientBuilder {
  build() {
    this._log('Building started');

    gulp.src(['src/client/index.html'])
      .pipe(gulp.dest('build'));

    this._log('Index file moved to build');
    this._log('Client build complete')
  }

  _log(message = '') {
    logger.info('ClientBuilder:', message);
  }
}
