import bunyan from './bunyanInstance';

export default class Logger {
  constructor (appName) {
    this.appName = appName;
  }

  info (...messages) {
    bunyan.info(this.appName + ': ', ...messages);
  }

  warn (...messages) {
    bunyan.warn(this.appName + ': ', ...messages);
  }

  error (...messages) {
    bunyan.error(this.appName + ': ', ...messages);
  }
}
