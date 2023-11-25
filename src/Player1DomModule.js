import { mainGameLoop } from "./GameLoop";
import screenController from "./ScreenController";

// Get player1 name
function getPlayer1Name() {
  const form = document.querySelector(".player1-name-input");
  const input = document.querySelector("#player1-name");
  const inputValue = input.value;

  return input.value;
}

function clearFormInput() {
  const form = document.querySelector(".player1-name-input");
  const input = document.querySelector("#player1-name");

  clearInput(form);
  hideElement(form);
}

// Clear form & input
function clearInput(form) {
  form.reset();
}

function hideElement(element) {
  element.style.display = "none";
}

// Player1 Name submit button
const player1Btn = document.querySelector(".player1-btn");
player1Btn.addEventListener("click", () => {
  screenController.initializePlayer1();
});

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

    console.log(validElements);

    const everyValidElement = validElements.every(
      (item) => item.innerHTML === ""
    );

    console.log(everyValidElement);

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

// Delete allChildren of element
function deleteAllChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export {
  getPlayer1Name,
  clearFormInput,
  mouseOverPlaceHorizontally,
  mouseOutPlaceHorizontally,
  mouseOverPlaceVertically,
  mouseOutPlaceVertically,
  deleteAllChildren,
};
