import Player from "./Player";
import GameBoard from "./GameBoard";

describe("Player has required properties", () => {
  const player1 = new Player("symon");

  test("Tests that player has a gameBoard", () => {
    expect(player1.board).toBeInstanceOf(GameBoard);
  });

  test("Tests that player has a name", () => {
    expect(player1.name).toBeTruthy();
  });

  test("Tests that player has an enemy", () => {
    expect(player1.enemy).toBeNull();
  });
});

describe("Player's board object functions correctly", () => {
  const player1 = new Player("symon");

  // Random gameBoard
  const boardTester = new GameBoard();
  boardTester.placeShipHorizontally([1, 1], 3);
  boardTester.placeShipHorizontally([3, 4], 5);
  boardTester.placeShipVertically([4, 5], 4);
  boardTester.placeShipVertically([9, 5], 2);

  test("Tests whether player1 places ships correctly", () => {
    player1.board.placeShipHorizontally([1, 1], 3);
    player1.board.placeShipHorizontally([3, 4], 5);
    player1.board.placeShipVertically([4, 5], 4);
    player1.board.placeShipVertically([9, 5], 2);

    expect(player1.board.gameBoard).toEqual(boardTester.gameBoard);
  });
});

describe("Tests PlayRound method attacks enemy board/ship", () => {
  const player1 = new Player("symon");
  const player2 = new Player("computer");

  player1.enemy = player2;
  player2.enemy = player1;

  player1.board.placeShipHorizontally([1, 1], 3);
  player1.board.placeShipHorizontally([3, 4], 5);

  player2.board.placeShipVertically([4, 5], 4);
  player2.board.placeShipVertically([9, 5], 2);

  test("player1 playRoundMethod should destroy player2 board", () => {
    expect(player1.playRound([5, 4])).toBe("hit");
    expect(player1.playRound([7, 4])).toBe("hit");
  });

  test("player2 playRoundMethod should destroy player1 board", () => {
    expect(player2.playRound([1, 2])).toBe("hit");
    expect(player2.playRound([3, 7])).toBe("hit");
    expect(player2.playRound([1, 8])).toBe(1);
    expect(player2.playRound([5, 4])).toBe(1);
  });
});
