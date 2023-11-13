import Ship from "./Ship";

// GameBoard class
class GameBoard {
  #createGameBoard() {
    const gameBoardArr = [];
    const rows = 10;
    const columns = 10;

    for (let i = 0; i < rows; i++) {
      const cols = new Array(columns).fill(0);
      gameBoardArr.push(cols);
    }

    return gameBoardArr;
  }
  constructor() {
    this.gameBoard = this.#createGameBoard();
  }

  placeShipHorizontally(coordinates, length) {
    const warShip = new Ship(length);

    const start = coordinates[0];
    const end = coordinates[1];

    const targetRow = this.gameBoard[start];
    const targetStartIndex = targetRow.slice(end);

    if (length > targetStartIndex.length) {
      return "Invalid Move";
    }

    for (let i = end; i <= length; i++) {
      targetRow[i] = warShip;
    }

    return this.gameBoard;
  }
}

export default GameBoard;
