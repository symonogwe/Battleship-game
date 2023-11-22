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

    // clear form input & hide it
    clearInput(form);
    hideElement(form);
    this.placePlayer1Ships();
  }
  placePlayer1Ships() {
    console.log(this.mainGame.player1);
    const player1Board = this.mainGame.player1.board.gameBoard;
    renderEmptyPlayer1Board(player1Board);
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

function hideElement(element) {
  element.style.display = "none";
}

function renderEmptyPlayer1Board(board) {
  const startingBoard = document.querySelector(".player-1-empty-board");
  for (let i = 0; i < board.length; i++) {
    const row = board[i];

    for (let j = 0; j < row.length; j++) {
      const cell = row[j];
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell-div");
      // const cellP = document.createElement("p");
      // cellP.classList.add("cell-p");
      // cellP.textContent = `${i}, ${j}`;
      // cellDiv.append(cellP);
      // cellDiv.textContent = `${i}, ${j}`;

      cellDiv.dataset.x = i;
      cellDiv.dataset.y = j;

      startingBoard.appendChild(cellDiv);
    }
  }
}
