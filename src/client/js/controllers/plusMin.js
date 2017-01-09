import app from '../app';
import '../services/PlusMinClient';

app.controller('plusMinController', function ($element, $scope, $http, PlusMinClient) {
  let client = PlusMinClient;
  $scope.state = 'loading';

  $scope.toState = function (state) {
    $scope.state = state;
  };

  $scope.openList = function (list) {
    $scope.list = list;
    $scope.list.new = false;
    $scope.state = 'editList';
  };

  $scope.openNewList = function () {
    $scope.list = {
      new: true,
      positives: [],
      negatives: []
    };
    $scope.state = 'editList';
  };

  client.loadLists().then(function (request) {
    let lists = request.data;

    if (lists.length < 2) {
      $scope.state = 'editList';

      if (lists.length === 0) {
        $scope.list = {
          new: true,
          positives: [{
            title: 'Positief dingetje 1'
          }, {
            title: 'Positief dingetje 2'
          }, {
            title: 'Positief dingetje 3'
          }],
          negatives: [{
            title: 'Negatief dingetje 1'
          }]
        };
      } else {
        $scope.list = lists[0];
        $scope.list.new = false;
      }
    } else {
      $scope.state = 'selectList';
      $scope.lists = lists;
    }
  });
});
