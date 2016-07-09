import gulp from 'gulp';
import logger from './logger';

/**
 * Watches files and responds as they change
 */
export default class FileWatcher {
  constructor(server) {
    this._server = server;
    this._watchers = this._setWatchers();
  }

  set server(server) {
    this._server = server;
  }

  get server() {
    return this._server;
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
      self._log('Client file on path \'' + event.path + '\' was ' + event.type);
      self._server.rebuildClient();
    });
  }

  _setServerWatchers() {
    let self = this;
    return gulp.watch(['src/server/**/*.*', '!src/server/index.js'], function (event) {
      self._log('Server file on path \'' + event.path + '\' was ' + event.type);
      self._server.stop();
      self._reloadFunction();
    });
  }

  _setSpecialWatchers() {
    let self = this;
    return gulp.watch(['index.js', 'src/server/index.js'], function (event) {
      self._log('Server file on path \'' + event.path + '\' was ' + event.type);
      self._log('This part change of the server cannot be restarted automatically. Please restart the server manually.');
    });
  }

  _log(message = '') {
    logger.info('FileWatcher: ', message);
  }
}
