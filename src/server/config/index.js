import Joi from 'joi';
import jsonServerConfig from 'config/server.json';
import schema from './schema.js';

class ServerConfig {
  constructor() {
    this._jsonConfig = jsonServerConfig;

    /**
     * Validate the JSON config
     */
    try {
      Joi.validate(this._jsonConfig, schema);
    } catch (e) {
      console.error('The config in \'config/server.json\' is not a valid config configuration. Error: ', e);
    }
  }

  get (value) {
    return this._jsonConfig[value];
  }
}

export default new ServerConfig();
