import database from '../../../database';
import ApiLogger from '../../ApiLogger';

let logger = new ApiLogger('api/lists/:id/[POST]');

export default function updateListHandler(request, result) {

  console.log(JSON.stringify(request.body, null, 2));
  console.log('calling again');

  database.updateList(request.params.id, request.body)
    .then(function (updateSchema) {
      result.send(updateSchema);
      logger.sendSuccessful(updateSchema);
    })
    .catch(function (error) {
      result.send(error);
      logger.sendFailed(error);
    });
}
