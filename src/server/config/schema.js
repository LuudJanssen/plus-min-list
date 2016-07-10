/**
 * Defines the config's Joi schema
 */
import Joi from 'joi';

const schema = Joi.object().keys({
  'appName': Joi.string().default('plus-min-list-test'),
  'database': Joi.object({
    'host': Joi.string().default('localhost'),
    'port': Joi.number().default(28015)
  })
});

export default schema;
