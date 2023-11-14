import GameBoard from "./GameBoard";
import Ship from "./Ship";

// tests whether our gameBoard objects have a gameBoard property
const gameBoard1 = new GameBoard();
test("tests whether our gameBoard objects have a (10 * 10) gameBoard property", () => {
  const boardArray = [];
  const rows = 10;
  const columns = 10;

  for (let i = 0; i < rows; i++) {
    const cols = new Array(columns).fill(0);
    boardArray.push(cols);
  }
  expect(gameBoard1).toHaveProperty("gameBoard", boardArray);
});

// GameBoards should be able to place ships at specific coordinates horizontally
test("GameBoards should be able to place ships at specific coordinates horizontally", () => {
  const targetBoard = new GameBoard();
  targetBoard.gameBoard[4][1] = new Ship(5);
  targetBoard.gameBoard[4][2] = new Ship(5);
  targetBoard.gameBoard[4][3] = new Ship(5);
  targetBoard.gameBoard[4][4] = new Ship(5);
  targetBoard.gameBoard[4][5] = new Ship(5);

  gameBoard1.placeShipHorizontally = jest.fn((coordinate, length) => {
    const ship1 = new Ship(length);
    const start = coordinate[0];
    let end = coordinate[1];
    const arr = gameBoard1.gameBoard[start];

    let times = 0;
    while (times < length) {
      arr[end] = ship1;
      times++;
      end++;
    }

    gameBoard1.gameBoard[start] = arr;
    return gameBoard1.gameBoard;
  });
  gameBoard1.placeShipHorizontally([4, 1], 5);

  expect(gameBoard1.placeShipHorizontally.mock.results[0].value).toEqual(
    targetBoard.gameBoard
  );
});

test("Ships can't make an illegal horizontal move", () => {
  gameBoard1.placeShipHorizontally = jest.fn((coordinate, length) => {
    const ship1 = new Ship(length);
    const start = coordinate[0];
    let end = coordinate[1];
    const arr = gameBoard1.gameBoard[start];
    const targetStartIndex = arr.slice(end);

    if (length > targetStartIndex.length) {
      return "Invalid move";
    }

    let times = 0;
    while (times < length) {
      arr[end] = ship1;
      times++;
      end++;
    }

    gameBoard1.gameBoard[start] = arr;
    return gameBoard1.gameBoard;
  });

  gameBoard1.placeShipHorizontally([3, 6], 5);
  expect(gameBoard1.placeShipHorizontally.mock.results[0].value).toBe(
    "Invalid move"
  );
});

// GameBoard shouldn't place ship on another ship
const gameBoard3 = new GameBoard();
test("GameBoard shouldn't place ship on another ship horizontally", () => {
  const target1 = new GameBoard();
  target1.gameBoard[2][3] = new Ship(3);
  target1.gameBoard[2][4] = new Ship(3);
  target1.gameBoard[2][5] = new Ship(3);

  gameBoard3.placeShipHorizontally = jest.fn((coordinate, length) => {
    const ship1 = new Ship(length);
    const start = coordinate[0];
    let end = coordinate[1];
    const arr = gameBoard3.gameBoard[start];
    const targetStartIndex = arr.slice(end);
    let times = 0;
    let checkExistenceTimes = 0;
    let checkEnd = coordinate[1];

    if (length > targetStartIndex.length) {
      return "Invalid move";
    }

    while (checkExistenceTimes < length) {
      if (arr[checkEnd] !== 0) return "Can't place ship on another ship";
      checkExistenceTimes++;
      checkEnd++;
    }

    while (times < length) {
      arr[end] = ship1;
      times++;
      end++;
    }

    gameBoard3.gameBoard[start] = arr;
    return gameBoard3.gameBoard;
  });
  gameBoard3.placeShipHorizontally([2, 3], 3);
  gameBoard3.placeShipHorizontally([2, 1], 3);
  gameBoard3.placeShipHorizontally([2, 5], 2);

  expect(gameBoard3.placeShipHorizontally.mock.results[0].value).toEqual(
    target1.gameBoard
  );
  expect(gameBoard3.placeShipHorizontally.mock.results[1].value).toBe(
    "Can't place ship on another ship"
  );
  expect(gameBoard3.placeShipHorizontally.mock.results[2].value).toBe(
    "Can't place ship on another ship"
  );
});
const gameBoard4 = new GameBoard();
test("GameBoard shouldn't place ship on another ship horizontally", () => {
  const target3 = new GameBoard();
  target3.gameBoard[1][1] = new Ship(2);
  target3.gameBoard[2][1] = new Ship(2);

  gameBoard4.placeShipVertically = jest.fn((coordinate, length) => {
    const ship2 = new Ship(length);
    let start = coordinate[1];
    const end = coordinate[0];

    const totalColumnItems = 10;
    const selectedColumnItems = totalColumnItems - start;

    if (selectedColumnItems < length) {
      return "Invalid move";
    }

    let checkTimes = 0;
    let checkStart = coordinate[1];

    while (checkTimes < length) {
      let position = gameBoard4.gameBoard[checkStart][end];
      if (position !== 0) return "Can't place ship on another ship";
      checkTimes++;
      checkStart++;
    }

    let times = 0;
    while (times < length) {
      gameBoard4.gameBoard[start][end] = ship2;
      start++;
      times++;
    }

    return gameBoard4.gameBoard;
  });
  gameBoard4.placeShipVertically([1, 1], 2);
  gameBoard4.placeShipVertically([1, 0], 2);
  expect(gameBoard4.placeShipVertically.mock.results[0].value).toEqual(
    target3.gameBoard
  );
  expect(gameBoard4.placeShipVertically.mock.results[1].value).toBe(
    "Can't place ship on another ship"
  );
});

// GameBoards should be able to place ships at specific coordinates vertically
const gameBoard2 = new GameBoard();
test("GameBoards should be able to place ships at specific coordinates vertically", () => {
  const targetVerticalBoard = new GameBoard();
  targetVerticalBoard.gameBoard[2][9] = new Ship(3);
  targetVerticalBoard.gameBoard[3][9] = new Ship(3);
  targetVerticalBoard.gameBoard[4][9] = new Ship(3);

  gameBoard2.placeShipVertically = jest.fn((coordinate, length) => {
    const ship2 = new Ship(length);
    let start = coordinate[1];
    const end = coordinate[0];

    let times = 0;
    while (times < length) {
      gameBoard2.gameBoard[start][end] = ship2;
      start++;
      times++;
    }

    return gameBoard2.gameBoard;
  });

  gameBoard2.placeShipVertically([9, 2], 3);
  expect(gameBoard2.placeShipVertically.mock.results[0].value).toEqual(
    targetVerticalBoard.gameBoard
  );
});

test("Ships can't make illegal vertical move", () => {
  gameBoard2.placeShipVertically = jest.fn((coordinate, length) => {
    const ship2 = new Ship(length);
    let start = coordinate[1];
    const end = coordinate[0];

    const totalColumnItems = 10;
    const selectedColumnItems = totalColumnItems - start;

    if (selectedColumnItems < length) {
      return "Invalid move";
    }

    let times = 0;
    while (times < length) {
      gameBoard2.gameBoard[start][end] = ship2;
      start++;
      times++;
    }

    return gameBoard2.gameBoard;
  });

  gameBoard2.placeShipVertically([0, 7], 5);
  expect(gameBoard2.placeShipVertically.mock.results[0].value).toBe(
    "Invalid move"
  );
});

// Receive Attack method takes coordinates & s ends the ‘hit’ function to the correct ship
//  or records the coordinates of the missed shot.
test("Receive attack function sends hit to correct ship or records coordinates", () => {
  const gameBoard5 = new GameBoard();
  gameBoard5.placeShipHorizontally([1, 1], 3);
  gameBoard5.placeShipVertically([6, 2], 3);

  gameBoard5.receiveAttack = jest.fn((coordinates) => {
    const start = coordinates[0];
    const end = coordinates[1];

    if (gameBoard5.gameBoard[start][end] === 0) {
      gameBoard5.gameBoard[start][end] = 1;
      return 1;
    }
    if (gameBoard5.gameBoard[start][end] === 1) return 1;
    if (
      typeof gameBoard5.gameBoard[start][end] === "object" &&
      gameBoard5.gameBoard[start][end] instanceof Ship
    ) {
      let shipObj = gameBoard5.gameBoard[start][end];
      shipObj.hit();
      gameBoard5.gameBoard[start][end] = "hit";
      return "hit";
    }
    if (gameBoard5.gameBoard[start][end] === "hit") {
      return "hit";
    }
  });
  gameBoard5.receiveAttack([5, 3]);
  gameBoard5.receiveAttack([1, 1]);
  gameBoard5.receiveAttack([1, 3]);
  gameBoard5.receiveAttack([2, 6]);
  gameBoard5.receiveAttack([3, 6]);
  gameBoard5.receiveAttack([9, 6]);
  gameBoard5.receiveAttack([3, 6]);
  gameBoard5.receiveAttack([9, 6]);

  expect(gameBoard5.receiveAttack.mock.results[0].value).toEqual(1);
  expect(gameBoard5.receiveAttack.mock.results[1].value).toBe("hit");
  expect(gameBoard5.receiveAttack.mock.results[2].value).toBe("hit");
  expect(gameBoard5.receiveAttack.mock.results[3].value).toBe("hit");
  expect(gameBoard5.receiveAttack.mock.results[4].value).toBe("hit");
  expect(gameBoard5.receiveAttack.mock.results[5].value).toBe(1);
  expect(gameBoard5.receiveAttack.mock.results[6].value).toBe("hit");
  expect(gameBoard5.receiveAttack.mock.results[7].value).toBe(1);
});
