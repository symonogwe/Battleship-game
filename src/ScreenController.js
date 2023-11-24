import { GameLoop } from "./GameLoop";
import Player from "./Player";

import {
  getPlayer1Name,
  clearFormInput,
  mouseOverPlaceHorizontally,
  mouseOutPlaceHorizontally,
  deleteAllChildren,
} from "./DomModule";

import shipImg from "./Assets/ship.svg";

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
    deleteAllChildren(placingBoard);
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
          cellDiv.style.cursor = "not-allowed";

          const warShip = document.createElement("img");
          warShip.src = shipImg;
          warShip.classList.add("war-ship-img");

          cellDiv.appendChild(warShip);
        }

        let currentSize = this.mainGame.player1.board.shipSizes[0];

        cellDiv.addEventListener("mouseover", () => {
          mouseOverPlaceHorizontally(cellDiv, currentSize);
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
