function Grid( width, height ){
  this.width = width;
  this.height = height;
  this.grid = [];
  this.generateGrid();
  this.generatex
}

Grid.prototype.generateGrid = function(){
  for (var i = 0; i < this.width; i++) {
    this.grid[ i ] = [];
    for (var j = 0; j < this.height; j++) {
      this.grid[ i ].push({
        x: i,
        y: j,
        z: 0
      });
    }
  }
}

module.exports = Grid;
