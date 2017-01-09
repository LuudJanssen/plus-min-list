import app from '../app';
import '../services/PlusMinClient';

app.controller('plusMinController', function ($element, $scope, $http, PlusMinClient) {
  let client = PlusMinClient;
  $scope.state = 'loading';

  client.loadLists().then(function (request) {
    let lists = request.data;

    if (lists.length < 2) {
      $scope.state = 'editList';

      if (lists.length === 0) {
        $scope.list = {
          new: true,
          positives: [''],
          negatives: ['']
        };
      } else {
        $scope.list = list[0];
        $scope.list.new = false;
      }
    } else {
      $scope.state = 'selectList';
      $scope.lists = lists;
    }
  });
});
