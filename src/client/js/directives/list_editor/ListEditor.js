import AngularClass from '../../helpers/AngularClass';

export default class ListEditor extends AngularClass {
  constructor() {
    super(...arguments);

    console.log('scope', this.$scope);
    console.log('list', this.$scope.list);
  }

}
