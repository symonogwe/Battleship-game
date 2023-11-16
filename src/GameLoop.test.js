import GameBoard from "./GameBoard";
import mainGameLoop from "./GameLoop";

describe("mainGameLoop should contain 2 player properties", () => {
  test("mainGameLoop should contain player1 & player2", () => {
    expect(mainGameLoop.player1).toBeTruthy();
    expect(mainGameLoop.player2).toBeTruthy();
  });
});

describe("Players can fill their game boards in the mainGameLoop", () => {
  test("Player1 can fill out random coordinates in gameBoard", () => {
    // random game-board
    const randomGameBoard = new GameBoard();
    randomGameBoard.placeShipHorizontally([1, 1], 3);
    randomGameBoard.placeShipVertically([4, 5], 4);

    // mainGameLoop Player1
    mainGameLoop.player1.board.placeShipHorizontally([1, 1], 3);
    mainGameLoop.player1.board.placeShipVertically([4, 5], 4);

    expect(mainGameLoop.player1.board.gameBoard).toEqual(
      randomGameBoard.gameBoard
    );
  });

  test("Player2 can fill out random coordinates in gameBoard", () => {
    // random game-board
    const randomGameBoard = new GameBoard();
    randomGameBoard.placeShipHorizontally([3, 4], 5);
    randomGameBoard.placeShipVertically([9, 5], 2);

    // mainGameLoop Player2
    mainGameLoop.player2.board.placeShipHorizontally([3, 4], 5);
    mainGameLoop.player2.board.placeShipVertically([9, 5], 2);

    expect(mainGameLoop.player2.board.gameBoard).toEqual(
      randomGameBoard.gameBoard
    );
  });
});

describe("mainGameLoop should display current player turn & be able to switch turns", () => {
  test("Should be able to display current player turn", () => {
    expect(mainGameLoop.currentPlayer).toBeTruthy();
    expect(mainGameLoop.currentPlayer).toBe(mainGameLoop.player1);
  });
  test("Should be able to switch player turn", () => {
    expect(mainGameLoop.switchPlayerTurn()).toEqual(mainGameLoop.player2.name);
    expect(mainGameLoop.switchPlayerTurn()).toEqual(mainGameLoop.player1.name);
  });
});

describe("mainGameLoop should set each player as enemies", () => {
  test("setEnemies method works", () => {
    mainGameLoop.setEnemies();
    expect(mainGameLoop.player1.enemy).toEqual(mainGameLoop.player2);
    expect(mainGameLoop.player2.enemy).toEqual(mainGameLoop.player1);
  });
});
