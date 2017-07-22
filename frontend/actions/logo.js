const API = require('../apiUtil/api');
const Dispatcher = require('../dispatcher/dispatcher');
const Constants = require('../constants/constants');

module.exports = {
  getLogos: function(){
    API.getLogos( this.receiveLogos );
  },

  receiveLogos: function( data ){
    Dispatcher.dispatch({
      actionType: Constants.receiveLogos,
      data: data
    })
  }
}
