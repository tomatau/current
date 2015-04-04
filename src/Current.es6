import { Dispatcher } from 'flux';
import Store from './Store';
import ActionCreator from './ActionCreator';

class Current {
  constructor(options){
    Object.assign(this, {
      __DEV__: false,
      dispatcher: new Dispatcher()
    }, options)
  }
  registerStore(instance, toExport, callback){
    this.invariant(
      typeof callback == 'function',
      `Store registered without a callback`
    )
    return new Store(
      instance,
      toExport,
      this.dispatcher.register(callback)
    )
  }
  actionsCreator(creator){
    return new ActionCreator(creator, this);
  }
  invariant(condition, msg){
    if (!condition && this.__DEV__){
      const error = new Error(msg)
      error.framesToPop = 1
      console.warn(error.stack)
      throw error;
    }
  }
}
export default Current;