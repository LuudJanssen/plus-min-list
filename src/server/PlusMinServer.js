import express from 'express';
import Logger from './logger';
import ClientBuilder from './build/client';

let logger = new Logger('Server');

export default class PlusMinServer {
  constructor() {
    this._express = express();
    this._watchers = [];

    this._setupRouters();
    this.setupStatic();
  }

  get express () {
    return this._express;
  };

  start() {
    try {
      this._runningServer = this.express.listen(3000, this._serverController)
      logger.info('Server successfully started');
    } catch (e) {
      logger.warn('Starting server failed with error:', e);
    }
  }

  stop() {
    this._runningServer.close();
  }


  buildClient() {
    this._clientBuilder = new ClientBuilder;
    this._clientBuilder.build();
    this.setupStatic();
  }

  rebuildClient() {
    logger.info('Rebuilding client');
    this.buildClient();
  }

  setupStatic() {
    this.express.use(express.static('build'));
  }

  _setupRouters() {
  }

  static _serverController() {
    logger.info('Server started');
  }
}
