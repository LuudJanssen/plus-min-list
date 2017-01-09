import database from '../../../database';
import ApiLogger from '../../ApiLogger';

let logger = new ApiLogger('api/lists/:id/[DELETE]');

export default function deleteListHandler(request, result) {

  database.deleteList(request.params.id)
    .then(function (updateSchema) {
      result.send(updateSchema);
      logger.sendSuccessful(updateSchema);
    })
    .catch(function (error) {
      result.send(error);
      logger.sendFailed(error);
    });
}
