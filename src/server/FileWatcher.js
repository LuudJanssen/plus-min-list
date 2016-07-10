import gulp from 'gulp';
import Logger from './logger';

let logger = new Logger('FileWatcher');

/**
 * Watches files and responds as they change
 */
export default class FileWatcher {
  constructor(server) {
    this.server = server;
    this._watchers = this._setWatchers();
  }

  stopWatching() {
    this._watchers.forEach(function (watcher) {
      watcher.end();
    });
  }

  registerReload(callback) {
    this._reloadFunction = callback;
  }

  _setWatchers() {
    return [
      this._setClientWatchers(),
      this._setServerWatchers(),
      this._setSpecialWatchers()
    ]
  }

  _setClientWatchers() {
    let self = this;
    return gulp.watch(['src/client/**/*.*'], function (event) {
      logger.info('Client file on path \'' + event.path + '\' was ' + event.type);
      self.server.rebuildClient();
    });
  }

  _setServerWatchers() {
    let self = this;
    return gulp.watch(['src/server/**/*.*', '!src/server/index.js'], function (event) {
      logger.info('Server file on path \'' + event.path + '\' was ' + event.type);
      self.server.stop();
      self._reloadFunction();
    });
  }

  _setSpecialWatchers() {
    return gulp.watch(['index.js', 'src/server/index.js'], function (event) {
      logger.info('Server file on path \'' + event.path + '\' was ' + event.type);
      logger.info('This part change of the server cannot be restarted automatically. Please restart the server manually.');
    });
  }
}
