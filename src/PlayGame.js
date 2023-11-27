import screenController from "./ScreenController";
import skeletonImg from "./Assets/skeleton.svg";

// RENDER PLAYER GAME-BOARDS FUNCTIONALITY
function renderPlayer1GameBoard(targetDiv) {
  const player1Board = screenController.mainGame.player1.board.gameBoard;

  for (let i = 0; i < player1Board.length; i++) {
    const row = player1Board[i];

    for (let j = 0; j < row.length; j++) {
      const cell = row[j];

      const gameCell = document.createElement("div");
      gameCell.classList.add("game-cell");

      gameCell.dataset.x = i;
      gameCell.dataset.y = j;

      if (cell === "hit") {
        const skeleton = document.createElement("img");
        skeleton.src = skeletonImg;
        skeleton.classList.add("skeleton-img");

        gameCell.appendChild(skeleton);
      }
      targetDiv.appendChild(gameCell);
    }
  }
}

function renderPlayer2GameBoard(targetDiv) {
  const player2Board = screenController.mainGame.player2.board.gameBoard;

  for (let i = 0; i < player2Board.length; i++) {
    const row = player2Board[i];

    for (let j = 0; j < row.length; j++) {
      const cell = row[j];

      const gameCell = document.createElement("div");
      gameCell.classList.add("game-cell");

      gameCell.dataset.x = i;
      gameCell.dataset.y = j;

      if (cell === "hit") {
        const skeleton = document.createElement("img");
        skeleton.src = skeletonImg;
        skeleton.classList.add("skeleton-img");

        gameCell.appendChild(skeleton);
      }

      targetDiv.appendChild(gameCell);
    }
  }
}

export { renderPlayer1GameBoard, renderPlayer2GameBoard };
