import app from '../../app';
import useAngularClass from '../../helpers/useAngularClass';
import ListEditor from './ListEditor';
import editorTemplate from './index.html';

app.directive('listEditor', function () {
  return {
    restrict: 'E',
    scope: {
      list: '='
    },
    template: editorTemplate,
    controller: useAngularClass([], ListEditor)
  }
});
