class ConnectionExistsError {
  constructor(message = 'A connection to the database already Exists') {
    this.name = 'ConnectionExistsError';
    this.message = message;
  }
}

ConnectionExistsError.prototype = new Error();

export {ConnectionExistsError};
