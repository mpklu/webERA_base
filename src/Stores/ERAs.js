import { extendObservable } from 'mobx';

class Store {
  constructor() {
    extendObservable(this, {
      selected: null
    }
      
    );
  }
}

var ERAStore = new Store();
export default ERAStore;