import rethink from 'rethinkdb';
import serverConfig from '../config';
import {ConnectionExistsError} from './errors.js';
import Logger from '../logger';

let logger = new Logger('Database');

export default class PlusMinDatabase {
  constructor() {
    this._connection = null;
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

    if (this._connection !== null) {
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
      self._connection = connection;

      self._inOrder([
        function () {
          return self._createDbIfNotExists(serverConfig.get('database.name'));
        },
        function () {
          return self._createTableIfNotExists('lists');
        }
      ]);
    });
  }

  query() {
    return rethink.db(serverConfig.get('database.name'));
  }

  getLists() {
    let self = this;

    return this._checkConnection() ||
      new Promise(function (resolve, reject) {
        self.query()
          .table('lists')
          .run(self._connection, function (error, listsCursor) {
            if (error) throw error;

            self._convertCursor(listsCursor).then(function (lists) {
              resolve(lists);
            });
          });
      });
  }

  addList(list) {
    let self = this;

    if (!list.negatives) {
      list.negatives = [];
    }

    if (!list.positives) {
      list.positives = [];
    }

    if (!list.name) {
      list.name = 'New List';
    }

    return this._checkConnection() ||
      new Promise(function (resolve, reject) {
        self.query()
          .table('lists')
          .insert(list)
          .run(self._connection, function (error, updateSchema) {
            if (error) throw error;

            resolve(updateSchema);
          });
      });
  }

  updateList(listID, list) {
    let self = this;

    return this._checkConnection() ||
      new Promise(function (resolve, reject) {
        self.query()
          .table('lists')
          .filter(rethink.row('id').eq(listID))
          .update(list)
          .run(self._connection, function (error, updateSchema) {
            if (error) throw error;

            resolve(updateSchema);
          });
      });
  }

  deleteList(listID) {
    let self = this;

    return this._checkConnection() ||
      new Promise(function (resolve, reject) {
        self.query()
          .table('lists')
          .filter(rethink.row('id').eq(listID))
          .delete()
          .run(self._connection, function (error, updateSchema) {
            if (error) throw error;

            resolve(updateSchema);
          });
      });
  }

  _createTableIfNotExists(tableName = '') {
    var self = this;

    return new Promise(function (resolve, reject) {
      self._getTableList().then(function (tableList) {
        if (tableList.indexOf(tableName) === -1) {
          self._createTable(tableName);
        }
        resolve();
      });
    });

  }

  _createTable(tableName = '') {
    var self = this;

    return this._checkConnection() ||
      new Promise(function (resolve) {
        self.query().tableCreate(tableName).run(self._connection, function (error, result) {
          if (error) {
            throw error;
          }

          logger.info('Created table ', tableName);

          resolve(result);
        });
      });
  }

  _getTableList() {
    var self = this;

    return this._checkConnection() ||
      new Promise(function (resolve, reject) {
        self.query().tableList().run(self._connection, function (error, tableList) {
          error ? reject(error) : resolve(tableList);
        });
      });
  }

  _createDbIfNotExists(databaseName = '') {
    let self = this;

    return new Promise(function (resolve, reject) {
      self._getDbList()
        .then(function (databases) {
          if (databases.indexOf(databaseName) === -1) {
            self._createDb(databaseName);
          }
          resolve();
        })
        .catch(function (error) {
          logger.error(error);
        });
    });
  }

  _getDbList() {
    let self = this;

    return this._checkConnection() ||
      new Promise(function (resolve, reject) {
        rethink.dbList().run(self._connection, function (error, databases) {
          error ? reject(error) : resolve(databases);
        });
      });
  }

  _createDb(name = '') {
    let self = this;

    return this._checkConnection() ||
      new Promise(function (resolve, reject) {
        rethink.dbCreate(name).run(self._connection, function (error, result) {
          if (error) {
            reject(error);
            logger.error('Failed to create database', name);
          } else {
            resolve(result);
            logger.info('Created database', name);
          }
        })
      })
  }

  _checkConnection() {
    if (this._connection === null) {
      return new Promise(function (resolve, reject) {
        logger.warn('No database connection available');
        reject(new ConnectionExistsError());
      });
    }

    return false;
  }

  _convertCursor(cursor) {
    return new Promise(function (resolve) {
      cursor.toArray(function (error, result) {
        if (error) throw error;
        resolve(JSON.stringify(result, null, 2));
      });
    });
  }

  _inOrder(tasks) {
    let self = this;

    tasks[0]().then(function () {
      tasks.shift();

      if (tasks.length > 0) {
        self._inOrder(tasks);
      }
    });
  }
}
