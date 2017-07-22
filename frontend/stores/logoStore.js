const AppDispatcher = require('../dispatcher/dispatcher');
const Store = require('flux/utils').Store;
const Constants = require('../constants/constants');
const LogoStore = new Store(AppDispatcher);

LogoStore.logos = {};

LogoStore.setLogos = function( data ){
  if( data ){
    this.logos = data;
  }
}

LogoStore.getLogos = function(){
  return this.logos;
}

LogoStore.__onDispatch = function( payload ){
  switch( payload.actionType ){
    case Constants.receiveLogos:
    LogoStore.setLogos( payload.data );
    this.__emitChange();
  }
}

module.exports = LogoStore;
