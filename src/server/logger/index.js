import bunyan from './bunyanInstance';

export default class Logger {
  constructor (appName) {
    this.appName = appName;
  }

  info (message = '') {
    bunyan.info(this.appName + ': ', message);
  }

  warn (message = '') {
    bunyan.warn(this.appName + ': ', message);
  }

  error (message = '') {
    bunyan.error(this.appName + ': ', message);
  }
}
