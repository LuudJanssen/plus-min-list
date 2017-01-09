function useAngularClass(angularInvokes = [], Class) {

  let dependencyNames = angularInvokes.slice();

  class InvokeClass extends Class {
    constructor(...dependencies) {
      super([...dependencies], dependencyNames);
    }
  }

  angularInvokes.push(InvokeClass);

  return angularInvokes;
}

export default useAngularClass;
