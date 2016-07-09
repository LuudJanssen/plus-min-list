import express from 'express';
import logger from './logger';
import ClientBuilder from './build/client';

export default class PlusMinServer {
  constructor() {
    this._express = express();
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

  stop() {
    this._runningServer.close();
  }


  buildClient() {
    this._clientBuilder = new ClientBuilder;
    this._clientBuilder.build();
  }

  rebuildClient() {
    logger.info('Rebuilding client');
    this.buildClient();
  }

  get express () {
    return this._express;
  };

  _setupRouters() {
  }

  _setupStatic() {
    this.express.use(express.static('build'));
  }

  static _serverController() {
    logger.info('Server started');
  }
}
