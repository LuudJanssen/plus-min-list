import logger from './logger';
import PlusMinServer from './PlusMinServer';

logger.info('Started Server');

const server = new PlusMinServer();

server.start();
