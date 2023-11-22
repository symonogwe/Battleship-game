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

      cellDiv.dataset.x = i;
      cellDiv.dataset.y = j;

      cellDiv.addEventListener("mouseover", () => {
        hoverPlaceHorizontally(cellDiv, 3);
      });
      cellDiv.addEventListener("mouseout", () => {
        hoverMouseOut(cellDiv);
      });

      startingBoard.appendChild(cellDiv);
    }
  }
}

let validTarget;
function hoverPlaceHorizontally(cell, length) {
  const coordinates = [cell.dataset.x, cell.dataset.y];

  const coordinatesArr = [];
  let times = 0;
  let start = coordinates[0];
  let end = coordinates[1];

  while (times < length) {
    coordinatesArr.push([start, end]);
    end++;
    times++;
  }

  const targetCoordinates = coordinatesArr.map((arr) => [+arr[0], +arr[1]]);
  validTarget = targetCoordinates.filter((arr) => arr[1] < 10);

  console.log(validTarget);

  const allCellDivs = document.querySelectorAll(".cell-div");
  allCellDivs.forEach((item) => {
    let target = [+item.dataset.x, +item.dataset.y];

    if (validTarget.length === length) {
      for (let i = 0; i < validTarget.length; i++) {
        if (JSON.stringify(validTarget[i]) === JSON.stringify(target)) {
          item.style.backgroundColor = "green";
        }
      }
    }
  });
}

function hoverMouseOut(cell) {
  const targetCell = [+cell.dataset.x, +cell.dataset.y];

  cell.style.backgroundColor = "#1d2d44";

  const allCellDivs = document.querySelectorAll(".cell-div");
  allCellDivs.forEach((item) => {
    let target = [+item.dataset.x, +item.dataset.y];

    for (let i = 0; i < validTarget.length; i++) {
      if (JSON.stringify(validTarget[i]) === JSON.stringify(target)) {
        item.style.backgroundColor = "#1d2d44";
      }
    }
  });
}
