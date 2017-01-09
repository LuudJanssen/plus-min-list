import listsHandler from './lists';
import Logger from '../logger';

let logger = new Logger('Router');

export default function setupRouter(express) {
  express.get('/api/lists', listsHandler);
  logger.info('Listening for /api/lists');
}
