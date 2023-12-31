import screenController from "./ScreenController";
import skeletonImg from "./Assets/skeleton.svg";
import shipImg from "./Assets/ship.svg";
import {
  clearText,
  deleteAllChildren,
  revealElement,
} from "./Player1DomModule";

// RENDER PLAYER GAME-BOARDS FUNCTIONALITY
function renderPlayer1GameBoard(targetDiv) {
  targetDiv.style.cursor = "not-allowed";

  deleteAllChildren(targetDiv);

  const player1Board = screenController.mainGame.player1.board.gameBoard;

  for (let i = 0; i < player1Board.length; i++) {
    const row = player1Board[i];

    for (let j = 0; j < row.length; j++) {
      const cell = row[j];

      const gameCell = document.createElement("div");
      gameCell.classList.add("game-cell");

      gameCell.dataset.x = i;
      gameCell.dataset.y = j;

      if (typeof cell === "object") {
        const warShip = document.createElement("img");
        warShip.src = shipImg;
        warShip.classList.add("war-ship-img");

        gameCell.appendChild(warShip);
      }

      if (cell === "hit") {
        const skeleton = document.createElement("img");
        skeleton.src = skeletonImg;
        skeleton.classList.add("skeleton-img");

        gameCell.appendChild(skeleton);
      }

      if (cell === 1) {
        gameCell.style.backgroundColor = "orange";
      }

      targetDiv.appendChild(gameCell);
    }
  }
}

function renderPlayer2GameBoard(targetDiv) {
  deleteAllChildren(targetDiv);

  const player2Board = screenController.mainGame.player2.board.gameBoard;

  for (let i = 0; i < player2Board.length; i++) {
    const row = player2Board[i];

    for (let j = 0; j < row.length; j++) {
      const cell = row[j];

      const gameCell = document.createElement("div");
      gameCell.classList.add("game-cell");

      gameCell.style.cursor = "crosshair";

      gameCell.dataset.x = i;
      gameCell.dataset.y = j;

      if (cell === "hit") {
        const skeleton = document.createElement("img");
        skeleton.src = skeletonImg;
        skeleton.classList.add("skeleton-img");

        gameCell.appendChild(skeleton);
        gameCell.style.cursor = "none";
      }

      if (cell === 1) {
        gameCell.style.backgroundColor = "orange";
        gameCell.style.cursor = "none";
      }

      if (cell === 0 || typeof cell === "object") {
        gameCell.addEventListener("click", () => {
          attackComputer(gameCell);
        });
      }

      targetDiv.appendChild(gameCell);
    }
  }
}

function attackComputer(targetDiv) {
  const coordinates = [+targetDiv.dataset.x, +targetDiv.dataset.y];

  const message = screenController.mainGame.currentPlayerTurn(coordinates);
  const gamePlayResults = document.querySelector(".game-play-results");

  if (
    message ===
    `${screenController.mainGame.player1.name} sunk all of ${screenController.mainGame.player2.name}'s ships`
  ) {
    clearText(gamePlayResults);
    gamePlayResults.textContent = message;
    player2BoardResults();
    screenController.gameOver();

    return;
  }

  clearText(gamePlayResults);

  gamePlayResults.textContent = message;

  player2BoardResults();

  setTimeout(attackPlayer1, 1000);
}

function attackPlayer1() {
  const gamePlayResults = document.querySelector(".game-play-results");
  clearText(gamePlayResults);

  const message = screenController.mainGame.currentPlayerTurn();

  if (
    message ===
    `${screenController.mainGame.player2.name} sunk all of ${screenController.mainGame.player1.name}'s ships`
  ) {
    gamePlayResults.textContent = message;
    screenController.renderBothGameBoards();
    screenController.gameOver();
    return;
  }

  gamePlayResults.textContent = message;

  screenController.renderBothGameBoards();
}

function player2BoardResults() {
  const targetDiv = document.querySelector(".player-2-board");
  deleteAllChildren(targetDiv);

  const player2Board = screenController.mainGame.player2.board.gameBoard;

  for (let i = 0; i < player2Board.length; i++) {
    const row = player2Board[i];

    for (let j = 0; j < row.length; j++) {
      const cell = row[j];

      const gameCell = document.createElement("div");
      gameCell.classList.add("game-cell");

      gameCell.style.cursor = "none";

      gameCell.dataset.x = i;
      gameCell.dataset.y = j;

      if (cell === "hit") {
        const skeleton = document.createElement("img");
        skeleton.src = skeletonImg;
        skeleton.classList.add("skeleton-img");

        gameCell.appendChild(skeleton);
      }

      if (cell === 1) {
        gameCell.style.backgroundColor = "orange";
      }

      targetDiv.appendChild(gameCell);
    }
  }
}

// GAME OVER FUNCTIONALITY
function disablePlayer2Board() {
  const player2BoardDiv = document.querySelector(".player-2-board");
  player2BoardDiv.style.cursor = "none";
}

function revealPlayAgainBtn() {
  const playAgainBtn = document.querySelector(".play-again-btn");
  playAgainBtn.addEventListener("click", reloadGame);
  revealElement(playAgainBtn);
}

function reloadGame() {
  location.reload();
}

export {
  renderPlayer1GameBoard,
  renderPlayer2GameBoard,
  disablePlayer2Board,
  revealPlayAgainBtn,
};
