import app from '../../app';
import useAngularClass from '../../helpers/useAngularClass';
import ListSelector from './ListSelector';
import selectorTemplate from './index.html';

app.directive('listSelector', function () {
  return {
    restrict: 'E',
    template: selectorTemplate,
    controller: useAngularClass(['$scope', 'PlusMinClient'], ListSelector)
  }
});
