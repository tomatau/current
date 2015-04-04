import { EventEmitter } from 'events';

const CHANGE_EVENT = 'store::changed';
class Store {
  constructor(instance, toExport, dispatcherID){
    Object.assign(this, { dispatcherID }, EventEmitter.prototype)
    toExport.forEach((method)=>{
      this[method] = instance[method].bind(instance);
    })
    this.setMaxListeners(0)
  }
  addChangeListener(...args){
    this.addListener.apply(this, [CHANGE_EVENT].concat(args))
  }
  removeChangeListener(...args){
    this.removeListener.apply(this, [CHANGE_EVENT].concat(args))
  }
  emitChange(){
    this.emit(CHANGE_EVENT)
  }
}

export default Store;