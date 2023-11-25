import GameBoard from "./GameBoard";
// import { game, GameLoop } from "./GameLoop";
import { GameLoop } from "./GameLoop";
import Player from "./Player";

const game = new GameLoop();
game.player1 = new Player("symo");
game.setEnemies();
game.playerArray = [game.player1, game.player2];
game.currentPlayer = game.playerArray[0];

describe("Players can fill their game boards in the game", () => {
  test("Player1 can fill out random coordinates in gameBoard", () => {
    // random game-board
    const randomGameBoard = new GameBoard();
    randomGameBoard.placeShipHorizontally([1, 1], 3);
    randomGameBoard.placeShipVertically([4, 5], 4);

    // game Player1
    game.player1.board.placeShipHorizontally([1, 1], 3);
    game.player1.board.placeShipVertically([4, 5], 4);

    expect(game.player1.board.gameBoard).toEqual(randomGameBoard.gameBoard);
  });

  test("Player2 can fill out random coordinates in gameBoard", () => {
    // random game-board
    const randomGameBoard = new GameBoard();
    randomGameBoard.placeShipHorizontally([3, 4], 5);
    randomGameBoard.placeShipVertically([9, 5], 2);

    // game Player2
    game.player2.board.placeShipHorizontally([3, 4], 5);
    game.player2.board.placeShipVertically([9, 5], 2);

    expect(game.player2.board.gameBoard).toEqual(randomGameBoard.gameBoard);
  });
});

describe("game should display current player turn & be able to switch turns", () => {
  test("Should be able to display current player turn", () => {
    expect(game.currentPlayer).toBeTruthy();
    expect(game.currentPlayer).toBe(game.player1);
  });
  test("Should be able to switch player turn", () => {
    expect(game.switchPlayerTurn()).toEqual(game.player2.name);
    expect(game.switchPlayerTurn()).toEqual(game.player1.name);
  });
});

describe("game should set each player as enemies", () => {
  test("setEnemies method works", () => {
    game.setEnemies();
    expect(game.player1.enemy).toEqual(game.player2);
    expect(game.player2.enemy).toEqual(game.player1);
  });
});

describe("Manually call each player's playRound method", () => {
  test("Manually, Player1 destroys player2's ship", () => {
    const gameLoop2 = new GameLoop();
    gameLoop2.player1 = new Player("opo");
    gameLoop2.setEnemies();

    gameLoop2.player2.board.placeShipHorizontally([3, 4], 5);
    gameLoop2.player2.board.placeShipVertically([9, 5], 2);

    expect(gameLoop2.player1.playRound([5, 9])).toBe("hit");
    expect(gameLoop2.player1.playRound([6, 9])).toBe("hit");
  });

  test("Manually, Player2 destroys player1's ship", () => {
    const gameLoop3 = new GameLoop();
    gameLoop3.player1 = new Player("opo");

    gameLoop3.setEnemies();

    gameLoop3.player1.board.placeShipHorizontally([1, 1], 3);
    gameLoop3.player1.board.placeShipVertically([4, 5], 4);
  });
});

describe("CurrentPlayerTurn calls each Players PlayRound Method", () => {
  test("Current player switches player & plays round for all player till winner is found", () => {
    const gameLoop4 = new GameLoop();
    gameLoop4.player1 = new Player("symon");

    gameLoop4.setEnemies();

    gameLoop4.playerArray = [gameLoop4.player1, gameLoop4.player2];
    gameLoop4.currentPlayer = gameLoop4.playerArray[0];

    gameLoop4.player1.board.placeShipHorizontally([2, 4], 3);
    gameLoop4.player1.board.placeShipVertically([6, 5], 2);

    gameLoop4.player2.board.placeShipHorizontally([8, 6], 4);
    gameLoop4.player2.board.placeShipVertically([2, 3], 3);

    expect(gameLoop4.currentPlayerTurn([8, 6])).toBe(
      "symon hit Computer's ship"
    );
  });
});
