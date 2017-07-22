function Component( img, fadeIn, fadeOut ){
  this.image = new Image;
  this.image.src = img;
  this.inParams = fadeIn;
  this.outParams = fadeOut;
  this.image.style.position = "absolute";
  this.image.className = "logoEl";
  this.fadeOut();
}

Component.prototype.fadeIn = function(){
  this.image.style.transitionDelay = "2s";
  this.image.style.transition = "1s";
  this.image.style.opacity = "1";
  let keys = Object.keys( this.inParams );
  for (var i = 0; i < keys.length; i++) {
    let key = keys[ i ]
    let param = this.inParams[ key ];
    this.image.style[ key ] = param
  }
}

Component.prototype.fadeOut = function(){
  this.image.style.transitionDelay = "0s";
  this.image.style.transition = ".4s";
  this.image.style.opacity = "0";
  let keys = Object.keys( this.inParams );
  for (var i = 0; i < keys.length; i++) {
    let key = keys[ i ]
    let param = this.outParams[ key ];
    this.image.style[ key ] = param
  }
}

Component.prototype.getImage = function(){
  return this.image;
}

module.exports = Component
