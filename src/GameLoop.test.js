import GameBoard from "./GameBoard";
import { mainGameLoop, GameLoop } from "./GameLoop";

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

describe("Manually call each player's playRound method", () => {
  test("Manually, Player1 destroys player2's ship", () => {
    const gameLoop2 = new GameLoop();
    gameLoop2.setEnemies();

    gameLoop2.player2.board.placeShipHorizontally([3, 4], 5);
    gameLoop2.player2.board.placeShipVertically([9, 5], 2);

    expect(gameLoop2.player1.playRound([5, 9])).toBe("hit");
    expect(gameLoop2.player1.playRound([6, 9])).toBe("hit");
    expect(gameLoop2.player1.playRound([9, 2])).toBe(1);
    expect(gameLoop2.player1.playRound([3, 4])).toBe("hit");
    expect(gameLoop2.player1.playRound([3, 5])).toBe("hit");
    expect(gameLoop2.player1.playRound([3, 6])).toBe("hit");
    expect(gameLoop2.player1.playRound([3, 7])).toBe("hit");
    expect(gameLoop2.player1.playRound([3, 8])).toBe("All Sunk");
    expect(gameLoop2.player2.board.totalShipLength).toBe(7);
  });

  test("Manually, Player2 destroys player1's ship", () => {
    const gameLoop3 = new GameLoop();

    gameLoop3.setEnemies();

    gameLoop3.player1.board.placeShipHorizontally([1, 1], 3);
    gameLoop3.player1.board.placeShipVertically([4, 5], 4);

    expect(gameLoop3.player2.playRound([1, 1])).toBe("hit");
    expect(gameLoop3.player2.playRound([1, 2])).toBe("hit");
    expect(gameLoop3.player2.playRound([1, 3])).toBe("hit");
    expect(gameLoop3.player2.playRound([2, 6])).toBe(1);
    expect(gameLoop3.player2.playRound([5, 4])).toBe("hit");
    expect(gameLoop3.player2.playRound([6, 4])).toBe("hit");
    expect(gameLoop3.player2.playRound([7, 4])).toBe("hit");
    expect(gameLoop3.player2.playRound([8, 4])).toBe("All Sunk");
  });
});

describe("CurrentPlayerTurn calls each Players PlayRound Method", () => {
  test("Current player switches player & plays round for all player till winner is found", () => {
    const gameLoop4 = new GameLoop();

    gameLoop4.setEnemies();

    gameLoop4.player1.board.placeShipHorizontally([2, 4], 3);
    gameLoop4.player1.board.placeShipVertically([6, 5], 2);

    gameLoop4.player2.board.placeShipHorizontally([8, 6], 4);
    gameLoop4.player2.board.placeShipVertically([2, 3], 3);

    expect(gameLoop4.currentPlayerTurn([8, 6])).toBe(
      "symon hit computer's ship"
    );
    expect(gameLoop4.currentPlayerTurn([8, 4])).toBe(
      "computer missed symon's ship"
    );
    expect(gameLoop4.currentPlayerTurn([1, 7])).toBe(
      "symon missed computer's ship"
    );
    expect(gameLoop4.currentPlayerTurn([2, 4])).toBe(
      "computer hit symon's ship"
    );
    expect(gameLoop4.currentPlayerTurn([5, 2])).toBe(
      "symon hit computer's ship"
    );
    expect(gameLoop4.currentPlayerTurn([2, 5])).toBe(
      "computer hit symon's ship"
    );
    expect(gameLoop4.currentPlayerTurn([4, 2])).toBe(
      "symon hit computer's ship"
    );
    expect(gameLoop4.currentPlayerTurn([2, 6])).toBe(
      "computer hit symon's ship"
    );
    expect(gameLoop4.currentPlayerTurn([9, 9])).toBe(
      "symon missed computer's ship"
    );
    expect(gameLoop4.currentPlayerTurn([5, 6])).toBe(
      "computer hit symon's ship"
    );
    expect(gameLoop4.currentPlayerTurn([3, 2])).toBe(
      "symon hit computer's ship"
    );
    expect(gameLoop4.currentPlayerTurn([6, 6])).toBe(
      "computer sunk all of symon's ships"
    );
  });
});
