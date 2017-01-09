import Logger from '../logger';

class ApiLogger extends Logger {
  constructor(handler = '') {
    super('API');
    this._handler = handler;
  }

  sendSuccessful(data = false) {
    this.info('Successfully handled request for \'' + this._handler + '\'' + (data ? (' with data: \n\n' + data) : '.'));
  }

  sendFailed(error) {
    this.error('Request for \'' + this._handler + '\' failed with error: \n\n' + error);
  }
}

export default ApiLogger;
