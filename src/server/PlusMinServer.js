import express from 'express';
import gulp from 'gulp';
import _ from 'lodash';
import logger from './logger';
import ClientBuilder from './build/client';

export default class PlusMinServer {
  constructor() {
    this._express = express();
    this._restartFunction = _.noop;
    this._watchers = [];

    this._setupRouters();
    this._setupStatic();
  }

  start() {
    try {
      this._runningServer = this.express.listen(3000, this._serverController)
    } catch (e) {
      logger.warn('Starting server failed. Error:', e);
    }
  }

  restart() {
    try {
      this._watchers.forEach(function (watcher) {
        watcher.end();
      });
      this._runningServer.close();
      this._restartFunction();
    } catch (e) {
      logger.warn('Restarting failed. Error', e);
    }
  }


  buildClient() {
    this._clientBuilder = new ClientBuilder;
    this._clientBuilder.build();
  }

  rebuildClient() {
    logger.info('Rebuilding client');
    this.buildClient();
  }

  setWatchers() {
    var self = this;

    this._watchers.push(gulp.watch(['src/client/*.*'], function (event) {
      logger.info('Client file on path \'' + event.path + '\' was ' + event.type);
      self.rebuildClient();
    }));

    this._watchers.push(gulp.watch(['src/server/*.*', '!src/server/index.js'], function (event) {
      logger.info('Server file on path \'' + event.path + '\' was ' + event.type);
      self.restart();
    }));

    this._watchers.push(gulp.watch(['index.js', 'src/server/index.js'], function (event) {
      logger.info('Server file on path \'' + event.path + '\' was ' + event.type);
      logger.info('This part of the server cannot be restarted automatically. Please restart the server manually.');
    }));
  }

  registerRestart(callback) {
    this._restartFunction = callback;
  }

  get express () {
    return this._express;
  };

  _setupRouters() {
  }

  _setupStatic() {
    this.express.use(express.static('build'));
  }

  _serverController() {
    logger.info('Server started');
  }
}
