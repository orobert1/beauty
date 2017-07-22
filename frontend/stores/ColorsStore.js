const AppDispatcher = require('../dispatcher/dispatcher');
const Store = require('flux/utils').Store;
const Constants = require('../constants/constants');
const ColorsStore = new Store(AppDispatcher);

ColorsStore.colors = {};

ColorsStore.changeColors = function( colors ){
  this.colors = colors;
}

ColorsStore.getColors = function(){
  return this.colors;
}

ColorsStore.__onDispatch = function( payload ){
  switch( payload.actionType ){
    case Constants.RECEIVENEWCOLOR:
    this.changeColors( payload.data );
    this.__emitChange();
    break;
    case Constants.RECEIVEMURAL:
    this.changeColors( payload.data );
    this.__emitChange();
    break;
  }
}

module.exports = ColorsStore;
