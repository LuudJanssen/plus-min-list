import database from '../../database';
import ApiLogger from '../ApiLogger';

let logger = new ApiLogger('api/lists/[POST]');

export default function addListHandler(request, result) {

  database.addList(request.body)
    .then(function (updateSchema) {
      result.send(updateSchema.generated_keys);
      logger.sendSuccessful(updateSchema);
    })
    .catch(function (error) {
      result.send(error);
      logger.sendFailed(error);
    });
}
