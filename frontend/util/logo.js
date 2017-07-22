const Component = require('./component');

function Logo(){
  this.components = [];
}

Logo.prototype.addComponent = function( img, fadeIn, fadeOut ){
  this.components.push( new Component( img, fadeIn, fadeOut ) );
}

module.exports = Logo;
