import express from 'express';
import Logger from './logger';
import ClientBuilder from './build/client';
import serverConfig from './config';
import database from './database';
import setupRouter from './api/setupRouter';

let logger = new Logger('Server');
let reconnectionTime = serverConfig.get('database.reconnectionTime');

export default class PlusMinServer {
  constructor() {
    this._express = express();
    this._runningTimeouts = [];

    this._setupRouter();
    this.setupStatic();
  }

  get express() {
    return this._express;
  };

  start() {
    try {
      this._runningServer = this.express.listen(serverConfig.get('port'), this._serverController);
      logger.info('Server listening on port ' + serverConfig.get('port'));

      this._connectToDatabase();
    } catch (e) {
      logger.warn('Starting server failed with error:', e);
    }
  }

  stop() {
    this._runningServer.close();
    this._runningTimeouts.forEach((timeout) => clearTimeout(timeout));
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

  _setupRouter() {
    setupRouter(this._express);
  }

  _connectToDatabase() {
    let self = this;

    return database.connect()
      .then(function () {
        logger.info('Successfully connected to database');
      })
      .catch(function (error) {

        self._runningTimeouts.push(
          setTimeout(function () {
            self._connectToDatabase()
          }, reconnectionTime)
        );

        logger.warn('Connecting to database failed with error: \n\n', error, '\n\nTrying again in ' + reconnectionTime + 'ms');
      });
  }

  static _serverController() {
    logger.info('Server started');
  }
}
