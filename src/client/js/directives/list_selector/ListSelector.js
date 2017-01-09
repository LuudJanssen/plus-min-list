import AngularClass from '../../helpers/AngularClass';

export default class ListSelector extends AngularClass {
  constructor() {
    super(...arguments);

    this.client = this.PlusMinClient;
    this.loadLists();

    let self = this;
    this.$scope.deleteList = function (list) {
      let confirm = window.confirm("Are you sure you want to delete '" + list.name + "'?");

      if (confirm) {
        self.client.deleteList(list.id).then(function (request) {
          self.loadLists();
        });
      }
    };
  }

  loadLists() {
    let self = this;
    this.client.loadLists().then(function (request) {
      self.$scope.lists = request.data;
    });
  }
}
