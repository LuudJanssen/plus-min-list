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

  saveList(list) {
    return this.$http({
      method: 'POST',
      url: 'api/lists/',
      data: list
    });
  }

  updateList(id, list) {
    return this.$http({
      method: 'POST',
      url: 'api/lists/' + id,
      data: list
    });
  }

  deleteList(id) {
    return this.$http({
      method: 'DELETE',
      url: 'api/lists/' + id
    });
  }
}

app.service('PlusMinClient', useAngularClass(['$http', '$q'], PlusMinClient));
