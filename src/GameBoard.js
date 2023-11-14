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
    let end = coordinates[1];

    const targetRow = this.gameBoard[start];
    const targetStartIndex = targetRow.slice(end);

    if (length > targetStartIndex.length) {
      return "Invalid Move";
    }
    // check if ship exists in position
    const shipExists = checkIfShipExistsHorizontal.call(
      this,
      targetRow,
      coordinates,
      length
    );
    if (shipExists) return shipExists;

    // place ship horizontally
    placeShipHorizontally.call(this, targetRow, coordinates, length);

    return this.gameBoard;
  }

  placeShipVertically(coordinates, length) {
    const warShip = new Ship(length);
    let start = coordinates[1];
    const end = coordinates[0];

    const totalColumnItems = 10;
    const selectedColumnItems = totalColumnItems - start;

    if (selectedColumnItems < length) {
      return "Invalid move";
    }

    // check if ship exists in position
    // let checkShipTimes = 0;
    // let checkShipStart = coordinates[1];

    // while (checkShipTimes < length) {
    //   let position = this.gameBoard[checkShipStart][end];
    //   if (position !== 0) return "Can't place ship on another ship";
    //   checkShipTimes++;
    //   checkShipStart++;
    // }

    const shipExists = checkIfShipExistsVertical.call(
      this,
      coordinates,
      length
    );
    if (shipExists) return shipExists;

    // place ship vertically
    // let times = 0;
    // while (times < length) {
    //   this.gameBoard[start][end] = warShip;
    //   start++;
    //   times++;
    // }
    placeShipVertically.call(this, coordinates, length);

    return this.gameBoard;
  }
}

// Utility GameBoard functions
//  PlaceShipHorizontally Utility functions
function checkIfShipExistsHorizontal(targetRow, coordinates, length) {
  let checkShipTimes = 0;
  let checkShipEnd = coordinates[1];

  while (checkShipTimes < length) {
    if (targetRow[checkShipEnd] !== 0)
      return "Can't place ship on another ship";
    checkShipTimes++;
    checkShipEnd++;
  }
}

function placeShipHorizontally(target, coordinates, length) {
  let times = 0;
  let end = coordinates[1];
  while (times < length) {
    target[end] = new Ship(length);
    times++;
    end++;
  }
}

//  PlaceShipVertically Utility functions
function checkIfShipExistsVertical(coordinates, length) {
  const end = coordinates[0];
  let times = 0;
  let shipStart = coordinates[1];

  while (times < length) {
    let position = this.gameBoard[shipStart][end];
    if (position !== 0) return "Can't place ship on another ship";
    times++;
    shipStart++;
  }
}

function placeShipVertically(coordinates, length) {
  let times = 0;
  let start = coordinates[1];
  const end = coordinates[0];

  while (times < length) {
    this.gameBoard[start][end] = new Ship(length);
    start++;
    times++;
  }
}

const g1 = new GameBoard();
console.log(g1.placeShipHorizontally([2, 3], 5));
console.log(g1.placeShipVertically([1, 7], 3));
console.log(g1.placeShipHorizontally([7, 0], 4));
console.log(g1.placeShipVertically([4, 0], 5));
console.log(g1.placeShipVertically([8, 9], 4));
export default GameBoard;
