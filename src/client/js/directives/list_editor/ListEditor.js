import AngularClass from '../../helpers/AngularClass';

export default class ListEditor extends AngularClass {
  constructor() {
    super(...arguments);

    this.test().then(function (message) {
      console.log(message);
    });
  }
}
