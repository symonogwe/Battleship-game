import Player from "./Player";

class GameLoop {
  constructor() {
    this.player1 = new Player("symon");
    this.player2 = new Player("computer");
    this.playerArray = [this.player1, this.player2];
    this.currentPlayer = this.playerArray[0];
  }

  setEnemies() {
    this.player1.enemy = this.player2;
    this.player2.enemy = this.player1;
  }

  switchPlayerTurn() {
    if (this.currentPlayer === this.playerArray[0]) {
      this.currentPlayer = this.playerArray[1];
      return this.currentPlayer.name;
    } else {
      this.currentPlayer = this.playerArray[0];
      return this.currentPlayer.name;
    }
  }
}

const mainGameLoop = new GameLoop();
export default mainGameLoop;
