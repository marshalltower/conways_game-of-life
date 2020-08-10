var expect = chai.expect;

describe("GameofLife", function() {
	describe("Upon Initalizing", function() {
		it("Throws error if no dimensions are passed in", function() {
			expect(function() {
				let game = new GameofLife();
			}).to.throw("Must provide valid integer dimensions when creating a GameOfLife");
		});

		it("Throws error if a non-integer is passed in", function() {
			expect(function() {
				let game = new GameofLife(3, 'three');
			}).to.throw("Must provide valid integer dimensions when creating a GameOfLife");
		});

		it("Correctly creates a new grid with corresponding size filled with dead cells (ex 3x3)", function() {
			let game = new GameofLife(3, 3);
			expect(game.getGrid()).to.eql(
				[
					[0,0,0],
					[0,0,0],
					[0,0,0]
				]
			);
		});
	});

	describe("#resizeGrid", function(){
		it("Throws error if a non-integer is passed in", function() {
			expect(function() {
				let game = new GameofLife(3, 3);
				game.resizeGrid(4, 'four');
			}).to.throw("Must provide valid integer dimensions when resizing grid.");
		});

		it("Correctly increases size to new dimensions", function() {
			let game = new GameofLife(3, 3);
			game.resizeGrid(4, 4);
			expect(game.getGrid()).to.eql(
				[
					[0,0,0,0],
					[0,0,0,0],
					[0,0,0,0],
					[0,0,0,0]
				]
			);
		});

		it("Correctly decreases size to new dimensions", function() {
			let game = new GameofLife(3, 3);
			game.resizeGrid(2, 2);
			expect(game.getGrid()).to.eql(
				[
					[0,0],
					[0,0]
				]
			);
		});

		it("Correctly increases size to new dimensions while keep as much of the previous states as possible", function() {
			let game = new GameofLife(3, 3);
			game.setCell(1, 1, 1);
			game.resizeGrid(4, 4);
			expect(game.getGrid()).to.eql(
				[
					[0,0,0,0],
					[0,1,0,0],
					[0,0,0,0],
					[0,0,0,0]
				]
			);
		});

		it("Correctly decreases size to new dimensions while keep as much of the previous states as possible", function() {
			let game = new GameofLife(3, 3);
			game.setCell(1, 1, 1);
			game.resizeGrid(2, 2);
			expect(game.getGrid()).to.eql(
				[
					[0,0],
					[0,1]
				]
			);
		});
	});

	describe("#getGrid", function(){
		it("Correctly retrieves the grid property", function() {
			let game = new GameofLife(3, 3);
			expect(game.getGrid()).to.eql(
				[
					[0,0,0],
					[0,0,0],
					[0,0,0]
				]
			);
		});
	});

	describe("#setCell", function(){
		it("Correctly sets designated cell to alive state (ie 1)", function() {
			let game = new GameofLife(3, 3);
			game.setCell(0, 0, 1);
			expect(game.getGrid()).to.eql(
				[
					[1,0,0],
					[0,0,0],
					[0,0,0]
				]
			);
		});

		it("Correctly sets designated cell to back to dead state (ie 0)", function() {
			let game = new GameofLife(3, 3);
			game.setCell(0, 0, 1);
			game.setCell(0, 0, 0);
			expect(game.getGrid()).to.eql(
				[
					[0,0,0],
					[0,0,0],
					[0,0,0]
				]
			);
		});

		it("Throws error if a non-integer is passed in", function() {
			expect(function(){
				let game = new GameofLife(3, 3);
				game.setCell(true, 0, 1);
			}).to.throw("Cell position must be valid integer coordinates.");
		});

		it("Throws error if a non-integer boolean represention is passed as the state", function() {
			expect(function(){
				let game = new GameofLife(3, 3);
				game.setCell(0, 0, true);
			}).to.throw("Cell state must be set to 0 or 1.");
		});

		it("Throws error the cell coordinates pass in infront of the valid grid", function() {
			expect(function(){
				let game = new GameofLife(3, 3);
				game.setCell(-1, -1, 1);
			}).to.throw("Cell is outside the bounds of grid.");
		});

		it("Throws error the cell coordinates pass in after the valid grid", function() {
			expect(function(){
				let game = new GameofLife(3, 3);
				game.setCell(4, 4, 1);
			}).to.throw("Cell is outside the bounds of grid.");
		});
	});


	describe("#isCellAlive", function(){
		it("Should return valid cell is true (ie. alive)", function() {
			let game = new GameofLife(3, 3);
			game.setCell(1, 1, 1);
			expect(game.isCellAlive(1,1)).to.equal(true);
		});

		it("Should return valid cell is false (ie. dead)", function() {
			let game = new GameofLife(3, 3);
			expect(game.isCellAlive(1,1)).to.equal(false);
		});

		it("Throws error if a non-integer is passed in", function() {
			expect(function(){
				let game = new GameofLife(3, 3);
				let cellAlive = game.isCellAlive(1, 'one');
			}).to.throw('Cell position must be valid integer coordinates.');
		});

		it("Throws error if a cell coordinate passed in are not in grid", function() {
			expect(function(){
				let game = new GameofLife(3, 3);
				let cellAlive = game.isCellAlive(-1, -1);
			}).to.throw('Cell is outside the bounds of grid.');
		});
	});

	describe("#countCellNeighbors", function(){
		it("Correctly returns count of 3 neighbour cells (basic functionality)", function() {
			let game = new GameofLife(3, 3);
			game.setCell(0,0,1);
			game.setCell(0,1,1);
			game.setCell(0,2,1);
			expect(game.countCellNeighbors(1, 1)).to.equal(3);
		});

		it("Returns correct count of neighboring cells (ex 2) for edge case when cell in is top-left corner", function() {
			let game = new GameofLife(3, 3);
			game.setCell(0,1,1);
			game.setCell(1,0,1);
			expect(game.countCellNeighbors(0, 0)).to.equal(2);
		});

		it("Returns correct count of neighboring cells (ex 2) for edge case when cell in is top-right corner", function() {
			let game = new GameofLife(3, 3);
			game.setCell(0,1,1);
			game.setCell(1,2,1);
			expect(game.countCellNeighbors(0, 2)).to.equal(2);
		});

		it("Returns correct count of neighboring cells (ex 2) for edge case when cell in is bottom-left corner", function() {
			let game = new GameofLife(3, 3);
			game.setCell(1,0,1);
			game.setCell(2,1,1);
			expect(game.countCellNeighbors(2, 0)).to.equal(2);
		});

		it("Returns correct count of neighboring cells (ex 2) for edge case when cell in is bottom-right corner", function() {
			let game = new GameofLife(3, 3);
			game.setCell(1,2,1);
			game.setCell(2,1,1);
			expect(game.countCellNeighbors(2, 2)).to.equal(2);
		});

		it("Throws error if a non-integer is passed in", function() {
			expect(function(){
				let game = new GameofLife(3, 3);
				game.countCellNeighbors(1, 'one');
			}).to.throw('Cell position must be valid integer coordinates.');
		});

		it("Throws error if a cell coordinate passed in are not in grid", function() {
			expect(function(){
				let game = new GameofLife(3, 3);
				game.countCellNeighbors(-1, -1);
			}).to.throw('Cell is outside the bounds of grid.');
		});
	});

	describe("#cellSurvives", function(){
		it("Returns cell state boolean (ex false) if cell is dead and there is only 1 neighbouring cell", function() {
			let game = new GameofLife(3, 3);
			game.setCell(0, 0, 1);
			expect(game.cellSurvives(1, 1)).to.equal(false);
		});

		it("Returns cell state boolean (ex false) if cell is dead and there is only 2 neighbouring cells", function() {
			let game = new GameofLife(3, 3);
			game.setCell(0, 0, 1);
			game.setCell(0, 1, 1);
			expect(game.cellSurvives(1, 1)).to.equal(false);
		});

		it("Returns cell state boolean (ex false) if cell is dead and there is only 3 neighbouring cells", function() {
			let game = new GameofLife(3, 3);
			game.setCell(0, 0, 1);
			game.setCell(0, 1, 1);
			game.setCell(0, 2, 1);
			expect(game.cellSurvives(1, 1)).to.equal(false);
		});

		it("Returns cell state boolean (ex false) if cell is dead and there is only 4 neighbouring cells", function() {
			let game = new GameofLife(3, 3);
			game.setCell(0, 0, 1);
			game.setCell(0, 1, 1);
			game.setCell(0, 2, 1);
			game.setCell(1, 0, 1);
			expect(game.cellSurvives(1, 1)).to.equal(false);
		});

		it("Returns cell state boolean (ex false) if cell is dead and there is only 5 neighbouring cells", function() {
			let game = new GameofLife(3, 3);
			game.setCell(0, 0, 1);
			game.setCell(0, 1, 1);
			game.setCell(0, 2, 1);
			game.setCell(1, 0, 1);
			game.setCell(1, 2, 1);
			expect(game.cellSurvives(1, 1)).to.equal(false);
		});

		it("Returns cell state boolean (ex false) if cell is dead and there is only 6 neighbouring cells", function() {
			let game = new GameofLife(3, 3);
			game.setCell(0, 0, 1);
			game.setCell(0, 1, 1);
			game.setCell(0, 2, 1);
			game.setCell(1, 0, 1);
			game.setCell(1, 2, 1);
			game.setCell(2, 0, 1);
			expect(game.cellSurvives(1, 1)).to.equal(false);
		});

		it("Returns cell state boolean (ex false) if cell is dead and there is only 7 neighbouring cells", function() {
			let game = new GameofLife(3, 3);
			game.setCell(0, 0, 1);
			game.setCell(0, 1, 1);
			game.setCell(0, 2, 1);
			game.setCell(1, 0, 1);
			game.setCell(1, 2, 1);
			game.setCell(2, 0, 1);
			game.setCell(2, 1, 1);
			expect(game.cellSurvives(1, 1)).to.equal(false);
		});

		it("Returns cell state boolean (ex false) if cell is dead and there is only 8 neighbouring cells", function() {
			let game = new GameofLife(3, 3);
			game.setCell(0, 0, 1);
			game.setCell(0, 1, 1);
			game.setCell(0, 2, 1);
			game.setCell(1, 0, 1);
			game.setCell(1, 2, 1);
			game.setCell(2, 0, 1);
			game.setCell(2, 1, 1);
			game.setCell(2, 2, 1);
			expect(game.cellSurvives(1, 1)).to.equal(false);
		});

		it("Returns cell state boolean (ex false) if cell is alive and there is only 1 neighbouring cell", function() {
			let game = new GameofLife(3, 3);
			game.setCell(1, 1, 1);
			game.setCell(0, 0, 1);
			expect(game.cellSurvives(1, 1)).to.equal(false);
		});

		it("Returns cell state boolean (ex true) if cell is alive and there is only 2 neighbouring cells", function() {
			let game = new GameofLife(3, 3);
			game.setCell(1, 1, 1);
			game.setCell(0, 0, 1);
			game.setCell(0, 1, 1);
			expect(game.cellSurvives(1, 1)).to.equal(true);
		});

		it("Returns cell state boolean (ex true) if cell is alive and there is only 3 neighbouring cells", function() {
			let game = new GameofLife(3, 3);
			game.setCell(1, 1, 1);
			game.setCell(0, 0, 1);
			game.setCell(0, 1, 1);
			game.setCell(0, 2, 1);
			expect(game.cellSurvives(1, 1)).to.equal(true);
		});

		it("Returns cell state boolean (ex false) if cell is alive and there is only 4 neighbouring cells", function() {
			let game = new GameofLife(3, 3);
			game.setCell(1, 1, 1);
			game.setCell(0, 0, 1);
			game.setCell(0, 1, 1);
			game.setCell(0, 2, 1);
			game.setCell(1, 0, 1);
			expect(game.cellSurvives(1, 1)).to.equal(false);
		});

		it("Returns cell state boolean (ex false) if cell is alive and there is only 5 neighbouring cells", function() {
			let game = new GameofLife(3, 3);
			game.setCell(1, 1, 1);
			game.setCell(0, 0, 1);
			game.setCell(0, 1, 1);
			game.setCell(0, 2, 1);
			game.setCell(1, 0, 1);
			game.setCell(1, 2, 1);
			expect(game.cellSurvives(1, 1)).to.equal(false);
		});

		it("Returns cell state boolean (ex false) if cell is alive and there is only 6 neighbouring cells", function() {
			let game = new GameofLife(3, 3);
			game.setCell(1, 1, 1);
			game.setCell(0, 0, 1);
			game.setCell(0, 1, 1);
			game.setCell(0, 2, 1);
			game.setCell(1, 0, 1);
			game.setCell(1, 2, 1);
			game.setCell(2, 0, 1);
			expect(game.cellSurvives(1, 1)).to.equal(false);
		});

		it("Returns cell state boolean (ex false) if cell is alive and there is only 7 neighbouring cells", function() {
			let game = new GameofLife(3, 3);
			game.setCell(1, 1, 1);
			game.setCell(0, 0, 1);
			game.setCell(0, 1, 1);
			game.setCell(0, 2, 1);
			game.setCell(1, 0, 1);
			game.setCell(1, 2, 1);
			game.setCell(2, 0, 1);
			game.setCell(2, 1, 1);
			expect(game.cellSurvives(1, 1)).to.equal(false);
		});

		it("Returns cell state boolean (ex false) if cell is alive and there is only 8 neighbouring cells", function() {
			let game = new GameofLife(3, 3);
			game.setCell(1, 1, 1);
			game.setCell(0, 0, 1);
			game.setCell(0, 1, 1);
			game.setCell(0, 2, 1);
			game.setCell(1, 0, 1);
			game.setCell(1, 2, 1);
			game.setCell(2, 0, 1);
			game.setCell(2, 1, 1);
			game.setCell(2, 2, 1);
			expect(game.cellSurvives(1, 1)).to.equal(false);
		});

		it("Throws error if a non-integer is passed in", function() {
			expect(function(){
				let game = new GameofLife(3, 3);
				game.cellSurvives(1, 'one');
			}).to.throw('Cell position must be valid integer coordinates.');
		});

		it("Throws error if a cell coordinate passed in are not in grid", function() {
			expect(function(){
				let game = new GameofLife(3, 3);
				game.cellSurvives(-1, -1);
			}).to.throw('Cell is outside the bounds of grid.');
		});
	});

	describe("#cellIsBorn", function(){
		it("Returns cell state boolean (ex false) if cell is dead and there is only 1 neighbouring cell", function() {
			let game = new GameofLife(3, 3);
			game.setCell(0, 0, 1);
			expect(game.cellIsBorn(1, 1)).to.equal(false);
		});

		it("Returns cell state boolean (ex false) if cell is dead and there is only 2 neighbouring cells", function() {
			let game = new GameofLife(3, 3);
			game.setCell(0, 0, 1);
			game.setCell(0, 1, 1);
			expect(game.cellIsBorn(1, 1)).to.equal(false);
		});

		it("Returns cell state boolean (ex true) if cell is dead and there is only 3 neighbouring cells", function() {
			let game = new GameofLife(3, 3);
			game.setCell(0, 0, 1);
			game.setCell(0, 1, 1);
			game.setCell(0, 2, 1);
			expect(game.cellIsBorn(1, 1)).to.equal(true);
		});

		it("Returns cell state boolean (ex false) if cell is dead and there is only 4 neighbouring cells", function() {
			let game = new GameofLife(3, 3);
			game.setCell(0, 0, 1);
			game.setCell(0, 1, 1);
			game.setCell(0, 2, 1);
			game.setCell(1, 0, 1);
			expect(game.cellIsBorn(1, 1)).to.equal(false);
		});

		it("Returns cell state boolean (ex false) if cell is dead and there is only 5 neighbouring cells", function() {
			let game = new GameofLife(3, 3);
			game.setCell(0, 0, 1);
			game.setCell(0, 1, 1);
			game.setCell(0, 2, 1);
			game.setCell(1, 0, 1);
			game.setCell(1, 2, 1);
			expect(game.cellIsBorn(1, 1)).to.equal(false);
		});

		it("Returns cell state boolean (ex false) if cell is dead and there is only 6 neighbouring cells", function() {
			let game = new GameofLife(3, 3);
			game.setCell(0, 0, 1);
			game.setCell(0, 1, 1);
			game.setCell(0, 2, 1);
			game.setCell(1, 0, 1);
			game.setCell(1, 2, 1);
			game.setCell(2, 0, 1);
			expect(game.cellIsBorn(1, 1)).to.equal(false);
		});

		it("Returns cell state boolean (ex false) if cell is dead and there is only 7 neighbouring cells", function() {
			let game = new GameofLife(3, 3);
			game.setCell(0, 0, 1);
			game.setCell(0, 1, 1);
			game.setCell(0, 2, 1);
			game.setCell(1, 0, 1);
			game.setCell(1, 2, 1);
			game.setCell(2, 0, 1);
			game.setCell(2, 1, 1);
			expect(game.cellIsBorn(1, 1)).to.equal(false);
		});

		it("Returns cell state boolean (ex false) if cell is dead and there is only 8 neighbouring cells", function() {
			let game = new GameofLife(3, 3);
			game.setCell(0, 0, 1);
			game.setCell(0, 1, 1);
			game.setCell(0, 2, 1);
			game.setCell(1, 0, 1);
			game.setCell(1, 2, 1);
			game.setCell(2, 0, 1);
			game.setCell(2, 1, 1);
			game.setCell(2, 2, 1);
			expect(game.cellIsBorn(1, 1)).to.equal(false);
		});

		it("Returns cell state boolean (ex false) if cell is dead and there is only 1 neighbouring cell", function() {
			let game = new GameofLife(3, 3);
			game.setCell(1, 1, 1);
			game.setCell(0, 0, 1);
			expect(game.cellIsBorn(1, 1)).to.equal(false);
		});

		it("Returns cell state boolean (ex false) if cell is dead and there is only 2 neighbouring cells", function() {
			let game = new GameofLife(3, 3);
			game.setCell(1, 1, 1);
			game.setCell(0, 0, 1);
			game.setCell(0, 1, 1);
			expect(game.cellIsBorn(1, 1)).to.equal(false);
		});

		it("Returns cell state boolean (ex false) if cell is dead and there is only 3 neighbouring cells", function() {
			let game = new GameofLife(3, 3);
			game.setCell(1, 1, 1);
			game.setCell(0, 0, 1);
			game.setCell(0, 1, 1);
			game.setCell(0, 2, 1);
			expect(game.cellIsBorn(1, 1)).to.equal(false);
		});

		it("Returns cell state boolean (ex false) if cell is dead and there is only 4 neighbouring cells", function() {
			let game = new GameofLife(3, 3);
			game.setCell(1, 1, 1);
			game.setCell(0, 0, 1);
			game.setCell(0, 1, 1);
			game.setCell(0, 2, 1);
			game.setCell(1, 0, 1);
			expect(game.cellIsBorn(1, 1)).to.equal(false);
		});

		it("Returns cell state boolean (ex false) if cell is dead and there is only 5 neighbouring cells", function() {
			let game = new GameofLife(3, 3);
			game.setCell(1, 1, 1);
			game.setCell(0, 0, 1);
			game.setCell(0, 1, 1);
			game.setCell(0, 2, 1);
			game.setCell(1, 0, 1);
			game.setCell(1, 2, 1);
			expect(game.cellIsBorn(1, 1)).to.equal(false);
		});

		it("Returns cell state boolean (ex false) if cell is dead and there is only 6 neighbouring cells", function() {
			let game = new GameofLife(3, 3);
			game.setCell(1, 1, 1);
			game.setCell(0, 0, 1);
			game.setCell(0, 1, 1);
			game.setCell(0, 2, 1);
			game.setCell(1, 0, 1);
			game.setCell(1, 2, 1);
			game.setCell(2, 0, 1);
			expect(game.cellIsBorn(1, 1)).to.equal(false);
		});

		it("Returns cell state boolean (ex false) if cell is dead and there is only 7 neighbouring cells", function() {
			let game = new GameofLife(3, 3);
			game.setCell(1, 1, 1);
			game.setCell(0, 0, 1);
			game.setCell(0, 1, 1);
			game.setCell(0, 2, 1);
			game.setCell(1, 0, 1);
			game.setCell(1, 2, 1);
			game.setCell(2, 0, 1);
			game.setCell(2, 1, 1);
			expect(game.cellIsBorn(1, 1)).to.equal(false);
		});

		it("Returns cell state boolean (ex false) if cell is dead and there is only 8 neighbouring cells", function() {
			let game = new GameofLife(3, 3);
			game.setCell(1, 1, 1);
			game.setCell(0, 0, 1);
			game.setCell(0, 1, 1);
			game.setCell(0, 2, 1);
			game.setCell(1, 0, 1);
			game.setCell(1, 2, 1);
			game.setCell(2, 0, 1);
			game.setCell(2, 1, 1);
			game.setCell(2, 2, 1);
			expect(game.cellIsBorn(1, 1)).to.equal(false);
		});

		it("Throws error if a non-integer is passed in", function() {
			expect(function(){
				let game = new GameofLife(3, 3);
				game.cellIsBorn(1, 'one');
			}).to.throw('Cell position must be valid integer coordinates.');
		});

		it("Throws error if a cell coordinate passed in are not in grid", function() {
			expect(function(){
				let game = new GameofLife(3, 3);
				game.cellIsBorn(-1, -1);
			}).to.throw('Cell is outside the bounds of grid.');
		});
	});

	describe("#getNextTick", function(){
		it("Update grid once with the next generation of cells based on the rules of Conway's Game of Life (ex. 3 cell row in middle changes to 3 cell column in middle)", function() {
			let game = new GameofLife(3, 3);
			game.setCell(1, 0, 1);
			game.setCell(1, 1, 1);
			game.setCell(1, 2, 1);
			game.getNextTick();
			expect(game.getGrid()).to.eql(
				[
					[0,1,0],
					[0,1,0],
					[0,1,0]
				]
			);
		});
	});
});