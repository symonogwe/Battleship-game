import { GameLoop } from "./GameLoop";
import Player from "./Player";

import {
  getPlayer1Name,
  clearFormInput,
  mouseOverPlaceHorizontally,
  mouseOutPlaceHorizontally,
} from "./DomModule";

class ScreenController {
  constructor() {
    this.mainGame = new GameLoop();
  }

  initializePlayer1() {
    const player1Name = getPlayer1Name();

    this.mainGame.player1 = new Player(player1Name);
    this.mainGame.setEnemies();
    this.mainGame.playerArray[0] = this.mainGame.player1;
    this.mainGame.currentPlayer = this.mainGame.playerArray[0];

    clearFormInput();
    this.renderStartingPlayer1Board();
  }

  renderStartingPlayer1Board() {
    const placingBoard = document.querySelector(".player-1-empty-board");
    placingBoard.textContent = "";
    const board = this.mainGame.player1.board.gameBoard;

    for (let i = 0; i < board.length; i++) {
      const row = board[i];

      for (let j = 0; j < row.length; j++) {
        const cell = row[j];

        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell-div");

        cellDiv.dataset.x = i;
        cellDiv.dataset.y = j;

        if (typeof cell === "object") {
          cellDiv.style.backgroundColor = "orange";
        }

        cellDiv.addEventListener("mouseover", () => {
          mouseOverPlaceHorizontally(cellDiv, 5);
        });

        cellDiv.addEventListener("mouseout", () => {
          mouseOutPlaceHorizontally(cellDiv);
        });

        placingBoard.appendChild(cellDiv);
      }
    }
  }
}

const screenController = new ScreenController();
export default screenController;
