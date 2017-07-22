const $ = require('jquery');

module.exports = {
  getLogos: function( callback ){
    $.ajax({
      url: "logos",
      method: "GET",
      success: function( data ){
        data = JSON.parse( data );
        callback( data )
      },
      error: function( err ){
        debugger
      }
    })
  }
}
