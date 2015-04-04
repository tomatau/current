class ActionsCreator {
  constructor(instance, flux){
    this.flux = flux;
    Object.keys(instance).forEach((key)=>{
      if (instance.hasOwnProperty(key)) {
        this[key] = this.dispatch.bind(this, instance[key], key)
      }
    })
  }
  async dispatch(creatorMethod, key, ...args){
    const payload = await creatorMethod.apply(this, args);
    if (!payload) return Promise.reject();
    this.flux.invariant(
      payload.actionType,
      `'${key}' dispatched without an actionType`
    )
    this.flux.dispatcher.dispatch(payload)
  }
}

export default ActionsCreator;