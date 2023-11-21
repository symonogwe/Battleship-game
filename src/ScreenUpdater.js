import { GameLoop } from "./GameLoop";
import Player from "./Player";

class ScreenUpdater {
  constructor() {
    this.mainGame = new GameLoop();
  }

  initializePlayer1() {
    const form = document.querySelector(".player1-name-input");
    const input = document.querySelector("#player1-name");
    const inputValue = input.value;

    // initialize player1
    this.mainGame.player1 = new Player(inputValue);
    this.mainGame.setEnemies();
    this.mainGame.playerArray[0] = this.mainGame.player1;
    this.mainGame.currentPlayer = this.mainGame.playerArray[0];

    // clear form input
    clearInput(form);
  }
}

// SCREEN UPDATER OBJECT
const screenUpdater = new ScreenUpdater();

// DOM MANIPULATION
// SET PLAYER1 NAME
const player1Btn = document.querySelector(".player1-btn");
player1Btn.addEventListener("click", () => {
  screenUpdater.initializePlayer1();
});

// UTILITY FUNCTIONS
function clearInput(form) {
  form.reset();
}
