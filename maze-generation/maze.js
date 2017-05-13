var cols, rows;
var w = 80; //single width
var grid = [];

var current; // the cell is currently visited

var stack = []; // use it when we get stuck(if there are no available neighbor)

function setup() {
    createCanvas(400, 400);
    cols = floor(width / w); //make sure get integers
    rows = floor(height / w);
    frameRate(5);

    // create cell objects
    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
            var cell = new Cell(i, j);
            grid.push(cell);
        }
    }

    current = grid[0]; // start the current cell at 0 which decides my maze begins and ends
    //=>set current.visited = true(line 33)
}

function draw() {
    background(80);
    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }

    current.visited = true;
    current.highlight();

    // step 1 Choose randomly one of the unvisited neighbours
    var nextCell = current.checkNeighbors();
    if (nextCell) {
        nextCell.visited = true;

        // step 2 Push the current cell to the stack
        stack.push(current);

        // step 3 Remove the wall between the current cell and the chosen cell
        removeWalls(current, nextCell);

        // step 4 Make the chosen cell the current cell and mark it as visited
        current = nextCell;
    } else if (stack.length > 0) {
        // if we get stuck we have to acktrack and find a spot that we kept track of in
    //   our stack to try going a different direction 
        current = stack.pop(); 
    }
    
}


function index(i, j) {
    // if the cell is near border
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
        return -1; // invalid index
    }
    return i + j * cols;
}


function removeWalls(a, b) {
    var x = a.i - b.i;
    // CELL i next to CELL i+1
    if (x == 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (x == -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }
    
    // CELL j next to CELL j+1
    var y = a.j - b.j;
    if (y == 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (y == -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }
}

function Cell(i, j) {
    //create a cell object
    this.i = i;
    this.j = j;
    // every cell when it starts  each wall is there
    // walls:     top   right bottom left
    this.walls = [true, true, true, true];
    this.visited = false;

    this.show = function() {
        var x = this.i * w;
        var y = this.j * w;

        // draw the walls
        // each cell:
        // (x, y)--------(x+w, y)
        //   |            |
        //   |            |
        //   |            |
        // (x, y+w)-----(x+w, y+w)

        stroke(255);
        if (this.walls[0]) {
            line(x, y, x + w, y);
        }
        if (this.walls[1]) {
            line(x + w, y, x + w, y + w);
        }
        if (this.walls[2]) {
            line(x + w, y + w, x, y + w);
        }
        if (this.walls[3]) {
            line(x, y + w, x, y);
        }

        if (this.visited) {
            noStroke(); //Don't draw a stroke around shapes
            fill(255, 0, 100, 128); 
            rect(x, y, w, w);  // Draw rectangle
        }
    }


    // Returns all neighbors of this cell, regardless if they are connected or not.
    this.checkNeighbors = function() {
        var neighbors = [];

        // the four neighbors of every cell
        var top = grid[index(i, j - 1)];
        var right = grid[index(i + 1, j)];
        var bottom = grid[index(i, j + 1)];
        var left = grid[index(i - 1, j)];

        if (top && !top.visited) {
            neighbors.push(top);
        }
        if (right && !right.visited) {
            neighbors.push(right);
        }
        if (bottom && !bottom.visited) {
            neighbors.push(bottom);
        }
        if (left && !left.visited) {
            neighbors.push(left);
        }

        if (neighbors.length > 0) {
            var r = floor(random(0, neighbors.length)); // pick a random neighbor
            return neighbors[r];
        } else {
            return undefined;
        }


    }


    this.highlight = function() {
        var x = this.i * w;
        var y = this.j * w;
        noStroke();
        var c = color('#F49393');
        fill(c);
        rect(x, y, w, w);

    }
}
