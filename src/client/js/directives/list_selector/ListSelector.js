import AngularClass from '../../helpers/AngularClass';

export default class ListSelector extends AngularClass {
  constructor() {
    super(...arguments);

    console.log('lists', this.$scope.lists);
  }

}
