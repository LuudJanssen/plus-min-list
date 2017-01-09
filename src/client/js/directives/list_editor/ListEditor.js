import AngularClass from '../../helpers/AngularClass';

export default class ListEditor extends AngularClass {
  constructor() {
    super(...arguments);

    this.client = this.PlusMinClient;

    this.addRowWhenFull(this.$scope.list.negatives);
    this.addRowWhenFull(this.$scope.list.positives);
    this.setUpdateStatus();

    this.$scope.deleteItem = this.deleteItem;
    this.$scope.saveList = this.saveList();

    this.saveListDebounce = this.debounce(500, this._saveToDB, true);
  }

  addRowWhenFull(list) {
    this.$scope.$watch(function () {
      return list;
    }, function () {
      if (list.length < 1 || list[list.length - 1].title !== '') {
        list.push({ title: '' });
      }
    }, true);
  }

  deleteItem(list, index) {
    list.splice(index, 1);
    this.saveList();
  }

  setUpdateStatus() {
    if (this.$scope.list.new) {
      this.$scope.updateStatus = 'empty';
    } else {
      this.$scope.updateStatus = 'saved';
    }
  }

  saveList() {
    let self = this;

    return function() {
      if (self.$scope.updateStatus !== 'saving') {
        self.$scope.updateStatus = 'saving';
        self.saveListDebounce();
      }
    }
  }

  _saveToDB() {
    let self = this;

    if (self.$scope.list.id) {
      self.client.updateList(self.$scope.list.id, self.$scope.list).then(function (result) {
        self.$scope.updateStatus = 'saved';
      });
    } else {
      self.client.saveList(self.$scope.list).then(function (result) {
        self.$scope.updateStatus = 'saved';
        self.$scope.list.id = result.data[0];
      });
    }
  }
}
