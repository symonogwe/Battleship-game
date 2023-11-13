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
    const end = coordinate[1];
    const arr = gameBoard1.gameBoard[start];

    for (let i = end; i <= length; i++) {
      arr[i] = ship1;
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
    const end = coordinate[1];
    const arr = gameBoard1.gameBoard[start];
    const targetStartIndex = arr.slice(end);

    if (length > targetStartIndex.length) {
      return "Invalid move";
    }

    for (let i = end; i <= length; i++) {
      arr[i] = ship1;
    }

    gameBoard1.gameBoard[start] = arr;
    return gameBoard1.gameBoard;
  });

  gameBoard1.placeShipHorizontally([3, 6], 5);
  expect(gameBoard1.placeShipHorizontally.mock.results[0].value).toBe(
    "Invalid move"
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
