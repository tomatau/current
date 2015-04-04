import React from 'react/addons';

const StoreListener = (stores, getStateFromStores, Component) =>
  React.createClass({
    getInitialState(){
      return getStateFromStores(this.props)
    },
    componentDidMount() {
      stores.forEach(store=>
        store.addChangeListener(this.handleStoreChanged.bind(this))
      )
    },
    componentWillUnmount(){
      stores.forEach(store=>
        store.removeChangeListener(this.handleStoreChanged)
      )
    },
    render() {
      return <Component {...this.props} {...this.state} />;
    },
    handleStoreChanged(){
      if (this.isMounted) {
        this.setState(getStateFromStores(this.props))
      }
    }
  })

export default StoreListener;