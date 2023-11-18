import Player from "./Player";
import { computerAi } from "./Player";

class GameLoop {
  constructor() {
    this.player1 = null;
    this.player2 = computerAi;
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

  currentPlayerTurn(coordinates) {
    const result = this.currentPlayer.playRound(coordinates);
    let message = null;

    if (result === 1) {
      message = `${this.currentPlayer.name} missed ${this.currentPlayer.enemy.name}'s ship`;
      this.switchPlayerTurn();
      return message;
    }
    if (result === "hit") {
      message = `${this.currentPlayer.name} hit ${this.currentPlayer.enemy.name}'s ship`;
      this.switchPlayerTurn();
      return message;
    }
    if (result === "All Sunk") {
      // this.gameOver()
      return `${this.currentPlayer.name} sunk all of ${this.currentPlayer.enemy.name}'s ships`;
    }
  }
}

const mainGameLoop = new GameLoop();
export { GameLoop, mainGameLoop };
