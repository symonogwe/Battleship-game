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

// GameBoards should be able to place ships at specific coordinates vertically
test("GameBoards should be able to place ships at specific coordinates vertically", () => {
  const targetBoard = new GameBoard();
  targetBoard.gameBoard[4][1] = new Ship(5);
  targetBoard.gameBoard[4][2] = new Ship(5);
  targetBoard.gameBoard[4][3] = new Ship(5);
  targetBoard.gameBoard[4][4] = new Ship(5);
  targetBoard.gameBoard[4][5] = new Ship(5);

  gameBoard1.placeShip = jest.fn((coordinate, length) => {
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
  gameBoard1.placeShip([4, 1], 5);

  expect(gameBoard1.placeShip.mock.results[0].value).toEqual(
    targetBoard.gameBoard
  );
});

test("Ships can't make an illegal vertical move", () => {
  gameBoard1.placeShip = jest.fn((coordinate, length) => {
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

  gameBoard1.placeShip([3, 6], 5);
  expect(gameBoard1.placeShip.mock.results[0].value).toBe("Invalid move");
});
