class AngularClass {
  constructor(dependencies, dependencyNames) {
    let self = this;
    dependencies.forEach(function (dependency, index) {
      self[dependencyNames[index]] = dependency;
    });
  }
}

export default AngularClass;
