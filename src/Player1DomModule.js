import { mainGameLoop } from "./GameLoop";
import screenController from "./ScreenController";

// PLAYER1 UTILITIES
// Get player1 name
function getPlayer1Name() {
  const form = document.querySelector(".player1-name-input");
  const input = document.querySelector("#player1-name");
  const inputValue = input.value;

  return input.value;
}

const player1Btn = document.querySelector(".player1-btn");
player1Btn.addEventListener("click", () => {
  screenController.initializePlayer1();
});

// DOM INTERACTION UTILITIES
function clearFormInput() {
  const form = document.querySelector(".player1-name-input");
  const input = document.querySelector("#player1-name");

  clearInput(form);
  hideElement(form);
}

function clearInput(form) {
  form.reset();
}

function hideElement(element) {
  element.style.display = "none";
}

function deleteAllChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function revealElement(element) {
  element.style.display = "block";
}

function clearText(element) {
  element.textContent = "";
}

// Player2 PlaceShip coordinates
const player2PlaceHorizontally = [
  [9, 1],
  [1, 5],
  [0, 6],
  [0, 0],
  [2, 1],
];
const player2PlaceVertically = [
  [3, 2],
  [0, 9],
  [4, 8],
  [3, 3],
  [8, 8],
];

// MOUSE OVER  CELL UTILITIES
const allHovers = ["horizontal", "vertical"];
let currentHover = allHovers[0];

// change currentHover
function changeCurrentHover() {
  if (currentHover === allHovers[0]) {
    currentHover = allHovers[1];
  } else if (currentHover === allHovers[1]) {
    currentHover = allHovers[0];
  }
}

const rotateShipBtn = document.querySelector(".rotate-ship");
rotateShipBtn.addEventListener("click", changeCurrentHover);

function applyMouseOver(cell, length) {
  if (currentHover === "horizontal") {
    mouseOverPlaceHorizontally(cell, length);
  } else if (currentHover === "vertical") {
    mouseOverPlaceVertically(cell, length);
  }
}

function applyMouseOut(cell) {
  if (currentHover === "horizontal") mouseOutPlaceHorizontally(cell);
  if (currentHover === "vertical") mouseOutPlaceVertically(cell);
}
//MouseOver PlaceHorizontally function
let validHorizontalTarget;

function mouseOverPlaceHorizontally(cell, length) {
  const coordinates = [+cell.dataset.x, +cell.dataset.y];

  const coordinatesArr = [];
  let times = 0;
  let start = coordinates[0];
  let end = coordinates[1];

  while (times < length) {
    coordinatesArr.push([start, end]);
    end++;
    times++;
  }

  validHorizontalTarget = coordinatesArr.filter((arr) => arr[1] < 10);

  setAdjacentHorizontalShips(length);
}

function setAdjacentHorizontalShips(length) {
  const allCellDivs = document.querySelectorAll(".cell-div");

  if (validHorizontalTarget.length === length) {
    const validElements = [];

    allCellDivs.forEach((item) => {
      let target = [+item.dataset.x, +item.dataset.y];

      const element = validHorizontalTarget.find((arr) => {
        return JSON.stringify(arr) === JSON.stringify(target);
      });

      if (element) validElements.push(item);
    });

    const everyValidElement = validElements.every(
      (item) => item.innerHTML === ""
    );

    if (everyValidElement) {
      validElements.forEach((item) => {
        item.style.backgroundColor = "orange";
      });

      const target = validElements[0];
      const clickTarget = [+target.dataset.x, +target.dataset.y];

      validElements[0].addEventListener("click", () => {
        placeHorizontally(clickTarget, length);
      });
    }
  }
}

// Place Horizontally click function
function placeHorizontally(coordinates, length) {
  screenController.mainGame.player1.board.placeShipHorizontally(
    coordinates,
    length
  );
  screenController.mainGame.player2.board.placeShipHorizontally(
    player2PlaceHorizontally.shift(),
    length
  );
  screenController.renderStartingPlayer1Board();
  validHorizontalTarget = [];
}

// MouseOut player1 placeHorizontally function
function mouseOutPlaceHorizontally(cell) {
  const targetCell = [+cell.dataset.x, +cell.dataset.y];

  const allCellDivs = document.querySelectorAll(".cell-div");
  allCellDivs.forEach((item) => {
    let target = [+item.dataset.x, +item.dataset.y];
    let times = 0;

    while (times < validHorizontalTarget.length) {
      let selected = validHorizontalTarget[times];
      if (selected[0] === target[0] && selected[1] === selected[1]) {
        item.style.backgroundColor = "#1d2d44";
      }

      times++;
    }
  });

  validHorizontalTarget = [];
}

// MouseOver PlaceVertically function
let validVerticalTarget;
function mouseOverPlaceVertically(cell, length) {
  const coordinates = [+cell.dataset.x, +cell.dataset.y];

  const coordinatesArr = [];
  let times = 0;
  let start = coordinates[0];
  let end = coordinates[1];

  while (times < length) {
    coordinatesArr.push([start, end]);
    start++;
    times++;
  }

  validVerticalTarget = coordinatesArr.filter((arr) => arr[0] < 10);
  setAdjacentVerticalShips(length);
}

function setAdjacentVerticalShips(length) {
  const allCellDivs = document.querySelectorAll(".cell-div");

  if (validVerticalTarget.length === length) {
    const validElements = [];

    allCellDivs.forEach((item) => {
      let target = [+item.dataset.x, +item.dataset.y];

      const element = validVerticalTarget.find((arr) => {
        return JSON.stringify(arr) === JSON.stringify(target);
      });

      if (element) validElements.push(item);
    });

    const everyValidElement = validElements.every(
      (item) => item.innerHTML === ""
    );

    if (everyValidElement) {
      validElements.forEach((item) => {
        item.style.backgroundColor = "orange";
      });

      const target = validElements[0];
      const clickTarget = [+target.dataset.x, +target.dataset.y];

      validElements[0].addEventListener("click", () => {
        placeVertically(clickTarget, length);
      });
    }
  }
}
// Place vertically click function
function placeVertically(coordinates, length) {
  screenController.mainGame.player1.board.placeShipVertically(
    coordinates,
    length
  );
  screenController.mainGame.player2.board.placeShipVertically(
    player2PlaceVertically.shift(),
    length
  );
  screenController.renderStartingPlayer1Board();
  validVerticalTarget = [];
}
// MouseOut player1 placeVertically function
function mouseOutPlaceVertically(cell) {
  const targetCell = [+cell.dataset.x, +cell.dataset.y];

  const allCellDivs = document.querySelectorAll(".cell-div");
  allCellDivs.forEach((item) => {
    let target = [+item.dataset.x, +item.dataset.y];
    let times = 0;

    while (times < validVerticalTarget.length) {
      let selected = validVerticalTarget[times];
      if (selected[0] === target[0] && selected[1] === target[1]) {
        item.style.backgroundColor = "#1d2d44";
      }

      times++;
    }
  });

  validVerticalTarget = [];
}

//PLAY GAME BUTTON FUNCTIONALITY
const playGameBtn = document.querySelector(".play-game-btn");
playGameBtn.addEventListener("click", () => {
  const targetDiv = document.querySelector(".place-player-1-ships");
  hideElement(targetDiv);
  screenController.renderBothGameBoards();
});

export {
  getPlayer1Name,
  clearFormInput,
  applyMouseOver,
  applyMouseOut,
  deleteAllChildren,
  revealElement,
  clearText,
};
