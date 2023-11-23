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
    this.totalShipLength = 0;
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

    // checks if ship exists in position
    const shipExists = checkIfShipExistsVertical.call(
      this,
      coordinates,
      length
    );
    if (shipExists) return shipExists;

    // places ship vertically
    placeShipVertically.call(this, coordinates, length);

    return this.gameBoard;
  }
  receiveAttack(coordinates) {
    const coordinateChange = receiveAttackUtility.call(this, coordinates);
    return coordinateChange;
  }
  allSunk() {
    let times = 0;
    let hits = 0;

    while (times < 10) {
      let arr = this.gameBoard[times];
      arr.forEach((item) => {
        if (item === "hit") hits++;
      });
      times++;
    }

    // checks if total hits ===totalShipLength
    if (hits === this.totalShipLength) return true;
    return false;
  }
}

// GAME-BOARD UTILITY FUNCTIONS
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
  const warShip = new Ship(length);
  let times = 0;
  let end = coordinates[1];
  while (times < length) {
    target[end] = warShip;
    times++;
    end++;
  }
  this.totalShipLength += length;
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
  const warShip = new Ship(length);
  let times = 0;
  let start = coordinates[1];
  const end = coordinates[0];

  while (times < length) {
    this.gameBoard[start][end] = warShip;
    start++;
    times++;
  }

  this.totalShipLength += length;
}

// Receive Attack Utility functions
function receiveAttackUtility(coordinates) {
  const start = coordinates[0];
  const end = coordinates[1];

  if (this.gameBoard[start][end] === 0) {
    this.gameBoard[start][end] = 1;
    return 1;
  }
  if (this.gameBoard[start][end] === 1) return 1;
  if (
    typeof this.gameBoard[start][end] === "object" &&
    this.gameBoard[start][end] instanceof Ship
  ) {
    let shipObj = this.gameBoard[start][end];
    shipObj.hit();

    this.gameBoard[start][end] = "hit";
    const allSunk = this.allSunk();

    if (allSunk) return "All Sunk";

    return "hit";
  }
  if (this.gameBoard[start][end] === "hit") {
    return "hit";
  }
}

export default GameBoard;
