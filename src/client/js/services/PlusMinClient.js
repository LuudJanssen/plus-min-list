import app from '../app'
import AngularClass from '../helpers/AngularClass';
import useAngularClass from '../helpers/useAngularClass';
import '../directives/list_editor';
import '../directives/list_selector';

class PlusMinClient extends AngularClass {
  constructor() {
    super(...arguments);
  }

  loadLists() {
    return this.$http({
      method: 'GET',
      url: 'api/lists'
    });
  }
}

app.service('PlusMinClient', useAngularClass(['$http', '$q'], PlusMinClient));
