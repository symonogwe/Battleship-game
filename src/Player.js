import GameBoard from "./GameBoard";

class Player {
  constructor(name) {
    this.name = name;
    this.enemy = null;
    this.board = new GameBoard();
  }

  playRound(coordinates) {
    return this.enemy.board.receiveAttack(coordinates);
  }
}

export default Player;
