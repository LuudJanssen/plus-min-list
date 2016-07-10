/**
 * Defines the config's Joi schema
 */
import Joi from 'joi';

const schema = Joi.object().keys({
  'appName': Joi.string().default('plus-min-list-test'),
  'database': Joi.object({
    'host': Joi.string().default('localhost'),
    'port': Joi.number().default(28015),
    'reconnectionTime': Joi.number().default(1000)
  }),
  'port': Joi.number().default(3000)
});

export default schema;
