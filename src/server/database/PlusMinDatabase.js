import rethink from 'rethinkdb';
import serverConfig from '../config';
import {ConnectionExistsError} from './errors.js';
import Logger from '../logger';

let logger = new Logger('Database');

export default class PlusMinDatabase {
  constructor() {
    this._dbConnection = null;
    this._connectionSettings = serverConfig.get('database');
  }

  /**
   * Connects to the RethinkDB database using the server config settings.
   *
   * @returns {Promise} Returns a promise that can throw a ConnectionExistsError if a connection was already found or
   * one of the RethinkDB errors.
   */
  connect() {
    logger.info('Connecting');

    if (this._dbConnection !== null) {
      return new Promise(function (resolve, reject) {
        logger.warn('Database connection already exists');
        reject(new ConnectionExistsError());
      });
    }

    let self = this;

    return rethink.connect(this._connectionSettings, function (error, connection) {
      if (error) {
        logger.error('Connecting to the database failed');
        return false;
      }

      logger.info('Database connection was set up');
      self._dbConnection = connection;
    });
  }
}
