// #3 Paste in your fully functional code from section 1.0 Build the Game of Life
var grid;
var BGColor = 250;
//different color options for background
var BGColorOptions = ['maroon','red','orange','blue','fuchsia','purple','teal','aqua','navy','black'];

function setup () {
  createCanvas(400, 400);
  grid = new Grid(20);
  grid.randomize();
  print("The most challenging part of adding customizations was implementing the keyPressed() function to change the background color.");
  print("For this project I pushed myself out of the comfort zone because it had been years before I had touched any web dev at all.");
  print("I would love to put this on my portfolio because it could serve as a milestone of how I've improved and will improve in the future.");
}

//if OPTION key is pressed, choose random color from BGColorOptions array.
function keyPressed() {
  if (keyCode === OPTION) {
    BGColor = (random(BGColorOptions));
  }
}

function draw () {
  background(BGColor);
  grid.updateNeighborCounts();
  grid.updatePopulation();
  grid.draw();
}

class Grid {
  constructor (cellSize) {
    // update the contructor to take cellSize as a parameter
    this.cellSize = cellSize;
    // use cellSize to calculate and assign values for numberOfColumns and numberOfRows
    this.numberOfColumns = width / cellSize;
    this.numberOfRows = height / cellSize;
    
    //step 2
    this.cells = new Array(this.numberOfColumns);
    for (var column = 0; column < this.numberOfColumns; column++){
      this.cells[column] = new Array(this.numberOfRows);
    }
    for (column = 0; column < this.numberOfColumns; column ++) {
        for (var row = 0; row < this.numberOfRows; row++) {
              this.cells[column][row] = new Cell(column, row, cellSize);
          }
    }
    print(this.cells);
  }
  

  draw () {
    for (var column = 0; column < this.numberOfColumns; column ++) {
      for (var row = 0; row < this.numberOfRows; row++) {
          this.cells[column][row].draw();
      }
    }
  }
  
  randomize(){
     for (var column = 0; column < this.numberOfColumns; column ++) {
      for (var row = 0; row < this.numberOfRows; row++) {
          this.cells[column][row].setIsAlive(floor(random(2)));
      }
    }
  }
  
  updatePopulation(){
    for (var column = 0; column < this.numberOfColumns; column ++) {
      for (var row = 0; row < this.numberOfRows; row++) {
          this.cells[column][row].liveOrDie();
      }
    }
  }
  
  //step 7
  getNeighbors(currentCell){
    var neighbors = [];
    
    // add logic to get neighbors and add them to the array
    for (var xOffset = -1; xOffset <= 1; xOffset++) {
      for (var yOffset = -1; yOffset <= 1; yOffset++) {
        var neighborColumn = currentCell.column + xOffset;
        var neighborRow = currentCell.row + yOffset;

        // do something with neighborColumn and neighborRow
        if(this.isValidPosition(neighborColumn,neighborRow)){
        //append(neighbors, neighborColumn, neighborRow);

        //step 9
        var neighborCell = this.cells[neighborColumn][neighborRow];
        if (neighborCell == currentCell){
          //print("not adding currentCell to neighbors array");
        }else if (neighborCell != currentCell){
          neighbors.push(neighborCell);
        }
      }
    }
  }

  return neighbors;
}

  //step 8
  isValidPosition (column, row) {
    // add logic that checks if the column and row exist in the grid
      if(column < 0 || row < 0 || row > this.numberOfRows-1 || column > this.numberOfColumns-1){
    // return true if they are valid and false if they are not
        return false;
      }else{
        return true;
    }
  }
//step 10
  updateNeighborCounts() {
  // for each cell in the grid
    // reset it's neighbor count to 0
    // get the cell's neighbors
    // increase liveNeighborCount by 1 for each neighbor that is alive
    for (var column = 0; column < this.numberOfColumns; column ++) {
      for (var row = 0; row < this.numberOfRows; row++) {
          this.cells[column][row].neighborCount = 0;
          var allNeighbors = this.getNeighbors(this.cells[column][row]);
          for(var i in allNeighbors){
            if(allNeighbors[i].isAlive == true){
              this.cells[column][row].liveNeighborCount += 1;
            }
          }
      }
    }
    // get the cell's neighbors
    // increase liveNeighborCount by 1 for each neighbor that is alive
  }
}

class Cell{
  constructor(column, row, size){
    this.column = column;
    this.row = row;
    this.size = size;
    this.isAlive = true;
    this.liveNeighborCount = 0;
  }
  draw () {
    //step 4
        if(this.isAlive == true){
          fill(200,0,200);
        }else{
          fill(240);
        }
        noStroke();
        rect(this.column * this.size + 1, this.row * this.size + 1, this.size - 1, this.size - 1);
  }
  
  setIsAlive(value){
    if(value == true){
      this.isAlive = true;
    }else{
      this.isAlive = false;
    }
  }
  
  liveOrDie(){
    if(this.isAlive && this.liveNeighborCount < 2){
      this.isAlive = false;
    }else if(this.isAlive && this.liveNeighborCount > 3){
      this.isAlive = false;
    }else if(this.isAlive == false && this.liveNeighborCount === 3){
      this.isAlive = true;
    }
  }
}

function mousePressed(){
    //grid.randomize();
    //var randomColumn = floor(random(grid.numberOfColumns));
    //var randomRow = floor(random(grid.numberOfRows));
  
    //var randomCell = grid.cells[randomColumn][randomRow];
    //var neighborCount = grid.getNeighbors(randomCell).length;
  
    //print("cell at " + randomCell.column + ", " + randomCell.row + " has " + neighborCount + " neighbors")
    grid.updateNeighborCounts();
    print(grid.cells);
    createCanvas(400, 400);
    grid = new Grid(20);
    grid.randomize();
    
    /*print(grid.isValidPosition(0, 0)); // should be true
    print(grid.isValidPosition(-1, -1)); // should be false
    // Add an example for all of the possible ways that it should return false
    print(grid.isValidPosition(21, 4)); // should be false
    print(grid.isValidPosition(4, 50)); // should be false
    print(grid.isValidPosition(0, 19));  // should be true
    print(grid.isValidPosition(20, 20)); // should be false*/
}

