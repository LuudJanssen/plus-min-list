import express from 'express';
import sayHello from './say_hello';
import logger from 'src/cli/logger';

export default class PlusMinServer {
  constructor() {
    this._express = express();

    this._setupRouters();
  }

  start() {
    this.express.listen(3000, this._serverController)
  }

  get express () {
    return this._express;
  };

  _setupRouters() {
    this.express.get('/', sayHello);
  }

  _serverController() {
    logger.info('SERVER STARTED');
  }
}
