class Player {
  constructor(color) {
    this.color = color;
  }
}

class Game {
  constructor(height = 6, width = 7) {
    this.HEIGHT = height;
    this.WIDTH = width;
    this.players = []; // Array to store player instances
    this.currPlayer = null; // Currently active player
    this.board = []; // Array of rows, each row is an array of cells
    this.gameOver = false; // To track if the game has ended

    this.startGame(); // Initialize the game
  }

  /** startGame: reset the game state and board */
  startGame() {
    this.board = [];
    this.gameOver = false;

    // Create players with colors from the form
    const color1 = document.getElementById('color1').value || 'red';
    const color2 = document.getElementById('color2').value || 'blue';
    this.players = [new Player(color1), new Player(color2)];

    this.currPlayer = this.players[0]; // Start with the first player

    this.makeBoard();
    this.makeHtmlBoard();
  }

  /** makeBoard: create in-JS board structure */
  makeBoard() {
    for (let y = 0; y < this.HEIGHT; y++) {
      this.board.push(Array.from({ length: this.WIDTH }));
    }
  }

  /** makeHtmlBoard: make HTML table and row of column tops */
  makeHtmlBoard() {
    const board = document.getElementById('board');
    board.innerHTML = ''; // Clear previous board

    // make column tops (clickable area for adding a piece to that column)
    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');
    top.addEventListener('click', this.handleClick.bind(this));

    for (let x = 0; x < this.WIDTH; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }

    board.append(top);

    // make main part of board
    for (let y = 0; y < this.HEIGHT; y++) {
      const row = document.createElement('tr');

      for (let x = 0; x < this.WIDTH; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }

      board.append(row);
    }
  }

  /** findSpotForCol: given column x, return top empty y (null if filled) */
  findSpotForCol(x) {
    for (let y = this.HEIGHT - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }

  /** placeInTable: update DOM to place piece into HTML table of board */
  placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.style.backgroundColor = this.currPlayer.color; // Use player's color
    piece.style.top = -50 * (y + 2);

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  /** endGame: announce game end */
  endGame(msg) {
    this.gameOver = true; // Set gameOver to true
    alert(msg);
  }

  /** handleClick: handle click of column top to play piece */
  handleClick(evt) {
    if (this.gameOver) return; // Ignore clicks if game is over

    // get x from ID of clicked cell
    const x = +evt.target.id;

    // get next spot in column (if none, ignore click)
    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }

    // place piece in board and add to HTML table
    this.board[y][x] = this.currPlayer;
    this.placeInTable(y, x);

    // Debugging logs
    console.log(`Current player color: ${this.currPlayer.color}`);
    
    // check for win
    if (this.checkForWin()) {
      return this.endGame(`Player with color ${this.currPlayer.color} won!`);
    }

    // check for tie
    if (this.board.every(row => row.every(cell => cell))) {
      return this.endGame('Tie!');
    }

    // switch players
    this.currPlayer = this.currPlayer === this.players[0] ? this.players[1] : this.players[0];
    
    // Debugging log for player switch
    console.log(`Next player color: ${this.currPlayer.color}`);
  }

  /** checkForWin: check board cell-by-cell for "does a win start here?" */
  checkForWin() {
    const _win = (cells) => {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer

      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.HEIGHT &&
          x >= 0 &&
          x < this.WIDTH &&
          this.board[y][x] === this.currPlayer
      );
    };

    for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

        // find winner (only checking each win-possibility as needed)
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }
}

// Create a new game instance
const game = new Game(6, 7);

// Attach start button functionality
document.getElementById('start-btn').addEventListener('click', () => {
  game.startGame();
});
