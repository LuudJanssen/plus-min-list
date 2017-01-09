import listsHandler from './lists';
import addListHandler from './lists/post';
import updateListHandler from './lists/:id/post'
import deleteListHandler from './lists/:id/delete'
import Logger from '../logger';

let logger = new Logger('Router');

export default function setupRouter(express) {
  express.get('/api/lists', listsHandler);
  logger.info('Listening for GET on /api/lists');
  express.post('/api/lists', addListHandler);
  logger.info('Listening for POST on /api/lists');
  express.post('/api/lists/:id', updateListHandler);
  logger.info('Listening for POST on /api/lists/:id');
  express.delete('/api/lists/:id', deleteListHandler);
  logger.info('Listening for DELETE on /api/lists/:id');
}
