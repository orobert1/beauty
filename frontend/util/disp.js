function Displacement( width, height, numPoints ){
  this.width = width;
  this.height = height;
  // this.show = true;
  this.test();
  this.numPoints = numPoints;
  this.canvas.width = width;
  this.canvas.height = height;
  this.ctx = this.canvas.getContext( "2d" );
  this.generateDisplacement();
  return this.canvas.toDataURL('image/jpeg');
}

Displacement.prototype.test = function(){
  if( this.show ){
    this.canvas = document.createElement("canvas");
    this.canvas.className = "canvas";
    document.body.appendChild(this.canvas)
  }else{
    this.canvas = document.createElement( "canvas" );
  }
},

Displacement.prototype.toImg = function(){
  return this.canvas.toDataURL('image/jpeg');
}

Displacement.prototype.generateDisplacement = function(){
  this.clearBoard();
  while( this.numPoints > 0 ){
    this.createMark()
    this.numPoints --;
  }
}

Displacement.prototype.addDisplacement = function( next ){
  this.ctx.globalAlpha=0.01;
  this.ctx.drawImage( next.canvas, 0, 0 );
}

Displacement.prototype.clearBoard = function(){
  let ctx = this.ctx;
  ctx.fillStyle = "black";
  ctx.fillRect( 0, 0, this.canvas.width, this.canvas.height );
}

Displacement.prototype.createMark = function(){
  let size = 20 + Math.floor( Math.random() * 80 );
  let x = Math.floor( Math.random() * this.width );
  let y = Math.floor( Math.random() * this.height );
  let radgrad = this.ctx.createRadialGradient(
    x, y, 0, x, y, size
  );
  if( Math.random() > .5 ){
    radgrad.addColorStop(0, 'rgba( 0,0,0,.5 )');
    radgrad.addColorStop(1, 'rgba( 0,0,0,0 )');
  }else{
    radgrad.addColorStop(0, 'rgba( 255,255,255,.5 )');
    radgrad.addColorStop(1, 'rgba( 255,255,255,0 )');
  }
  this.ctx.fillStyle = radgrad;
  this.ctx.fillRect(0,0,this.width,this.height);
}

module.exports = Displacement;
