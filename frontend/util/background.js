const Grid = require( './grid' );
const Displacement = require( './disp' );
const THREE = require('three');

function Background( width, height, amount ){
  this.width = width;
  this.height = height;
  this.amount = amount;
  this.count = 0;
  this.displacement = new Displacement( 1 * width, 1 * height, this.amount );
  this.setup();
}

Background.prototype.fadeIn = function(){
  let three = document.getElementById("three");
  if( three ){
    three.style.marginTop = "0px";
    three.style.opacity = .2;
  }

}

Background.prototype.fadeOut = function(){
  let three = document.getElementById("three");
  if( three ){
    three.style.marginTop = "50px";
    three.style.opacity = 0;
  }
}

Background.prototype.setup = function(){
  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000);
  this.camera.position.set(0, 100, 250);
	this.renderer = new THREE.WebGLRenderer({ alpha: true });
	this.renderer.setSize( window.innerWidth, window.innerHeight );
  let three = document.getElementById("three")
	three.appendChild( this.renderer.domElement );
  var loader = new THREE.TextureLoader();
  loader.load( './assets/images/kunstBackg.png' );
  this.addLights();
  this.addElements();
	this.camera.position.z = 5;
	this.animate();
}

Background.prototype.addLights = function(){
  let pointLight =
  new THREE.PointLight(0xFFFFFF, 2);

  // set its position
  pointLight.position.x = 10;
  pointLight.position.y = 50;
  pointLight.position.z = 20;

  // add to the scene
  this.scene.add(pointLight);

  let pointLight2 =
  new THREE.PointLight(0xFFFFFF, 2);

  // set its position
  pointLight2.position.x = -10;
  pointLight2.position.y = 100;
  pointLight2.position.z = 20;

  // add to the scene
  this.scene.add(pointLight2);
}

Background.prototype.addElements = function(){
  var texture, material, plane;
  THREE.ImageUtils.crossOrigin = 'localhost';
  var bump = new THREE.Texture( this.displacement.canvas );
  bump.needsUpdate = true;
  this.nextDisp = new Displacement( this.width, this.height, this.amount );
  texture = THREE.ImageUtils.loadTexture( "./assets/images/kunstBackg.png" );
  const sphereMaterial =
  new THREE.MeshPhongMaterial(
    {
      color: 0xFFFFFF,
      map: texture,
      displacementMap: bump,
      displacementScale: 400
    });
const RADIUS = 50;
const SEGMENTS = 16;
const RINGS = 16;

// Create a new mesh with
// sphere geometry - we will cover
// the sphereMaterial next!
  this.plane = new THREE.Mesh(
    new THREE.PlaneGeometry(
      4000,
      1000,
      300,
      300
    ),
    sphereMaterial
  );
  this.plane.position.z = -400;
  this.plane.rotation.x = -1.2;
  this.plane.position.y = -600.5;
  this.plane.position.x = -100.5;
  this.scene.add( this.plane );
}

Background.prototype.animate = function () {
  requestAnimationFrame( this.animate.bind( this ) );
  // this.displacement.addDisplacement( this.nextDisp );
  // var bump = new THREE.Texture( this.displacement.canvas );
  // this.plane.material.displacementMap = bump;
  // this.plane.material.displacementMap.needsUpdate = true;
  // if( this.count > 100 ){
  //   this.nextDisp = new Displacement( this.width, this.height, this.amount );
  //   this.count = 0;
  // }
  this.count++;
  this.renderer.render( this.scene, this.camera );
};

Background.prototype.newTop = function(){
  let displacement = new Displacement( this.width, this.height, this.amount );
  return displacement.toImg();
}

module.exports = Background;
