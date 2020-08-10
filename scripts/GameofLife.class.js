function GameofLife (width, height) {
	if(!Number.isInteger(width) || !Number.isInteger(height)) throw "Must provide valid integer dimensions when creating a GameOfLife.";

	let cols = width;
	let rows = height;
	let grid = new Array();

	grid = make2DGrid(width, height);
	grid = fill2dArray(grid);

	function make2DGrid(width, height) {
		let arr = new Array(height);
		for(let i = 0; i < arr.length; i++) {
			arr[i] = new Array(width);
		}
		return arr;
	}

	function fill2dArray(newGrid) {
		let arr = newGrid;
		for(let x = 0; x < arr.length; x++) {
			for(let y = 0; y < arr[x].length; y++) {
				arr[x][y] = 0;
			}
		}
		return arr;
	}

	this.resizeGrid = function(width, height) {
		if(!Number.isInteger(width) || !Number.isInteger(height)) throw "Must provide valid integer dimensions when resizing grid.";
		cols = width;
		rows = height;
		let newGrid = make2DGrid(width, height);
		newGrid = fill2dArray(newGrid);
		for(let x = 0; x < newGrid.length; x++) {
			for(let y = 0; y < newGrid[x].length; y++) {
				if(typeof grid[x] !== 'undefined' && typeof grid[x][y] !== 'undefined') newGrid[x][y] = grid[x][y];
			}
		}
		grid = newGrid;
	}

	this.getGrid = function() {
		return grid;
	}

	this.setCell = function(x, y, state) {
		checkCellValidity(x, y);
		if( !(state === 0 || state === 1) ) throw "Cell state must be set to 0 or 1.";
		grid[x][y] = state;
	}

	this.isCellAlive = function(x, y) {
		checkCellValidity(x, y);
		return (grid[x][y] === 1);
	}

	function checkCellValidity(x, y) {
		if(!Number.isInteger(x) || !Number.isInteger(y)) throw "Cell position must be valid integer coordinates.";
		if(typeof grid[x] === 'undefined' || typeof grid[x][y] === 'undefined') throw "Cell is outside the bounds of grid.";
	}

	//assumes that any cells outside of edge should be considered dead (i.e. state=0)
	this.countCellNeighbors = function(x, y) {
		checkCellValidity(x, y);
		let count = 0;
		for(let deltaX = -1; deltaX <= 1; deltaX++) {
			for(let deltaY = -1; deltaY <= 1; deltaY++) {
				let neighborCellX = x + deltaX;
				let neighborCellY = y + deltaY
				if( typeof grid[neighborCellX] !== 'undefined' &&
					typeof grid[neighborCellX][neighborCellY] !== 'undefined' &&
					this.isCellAlive(neighborCellX, neighborCellY, grid)
				) count++;
			}
		}

		if(grid[x][y] === 1) count--;

		return count;
	}

	this.cellSurvives = function(x, y) {
		checkCellValidity(x, y);
		let neighborCount = this.countCellNeighbors(x, y);
		return ( this.isCellAlive(x, y) && ( neighborCount === 2 || neighborCount === 3) );
	}

	this.cellIsBorn = function(x, y) {
		checkCellValidity(x, y);
		let neighborCount = this.countCellNeighbors(x, y);
		return ( !this.isCellAlive(x, y) && neighborCount === 3 );
	}

	this.getNextTick = function() {
		let nextGrid = grid.map(function(arr){
			return arr.slice();
		});//create copy of grid by value not reference
		for(let x = 0; x < nextGrid.length; x++) {
			for(let y = 0; y < nextGrid[x].length; y++) {
				let alive = ( this.cellSurvives(x, y) || this.cellIsBorn(x, y) );
				let state = Number(alive);
				nextGrid[x][y] = state;
			}
		}
		grid = nextGrid;
	}
}