import database from '../../database';
import ApiLogger from '../ApiLogger';

let logger = new ApiLogger('api/lists');

export default function listsHandler(request, result) {

  database.getLists()
    .then(function (lists) {
      setTimeout(function () {
        result.send(lists);
        logger.sendSuccessful(lists);
      }, 5000);
    })
    .catch(function (error) {
      result.send(error);
      logger.sendFailed(error);
    });
}
