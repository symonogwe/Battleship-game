import GameBoard from "./GameBoard";

class Player {
  constructor(name) {
    this.name = name;
    this.enemy = null;
    this.board = new GameBoard();
  }

  playRound(coordinates) {
    return this.enemy.board.receiveAttack(coordinates);
  }
}

// COMPUTER LOGIC IMPLEMENTATION
const validCoordinatePlays = [];

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    const row = [i, j];
    validCoordinatePlays.push(row);
  }
}

const computerAi = new Player("Computer");
computerAi.validPlayRoundMoves = validCoordinatePlays;

computerAi.playRound = function () {
  const randomPosition = Math.floor(Math.random() * 100);
  const randomCoordinate = this.validPlayRoundMoves.splice(
    randomPosition,
    1
  )[0];

  if (this.enemy) {
    return this.enemy.board.receiveAttack(randomCoordinate);
  }
};

computerAi.playRound();

export default Player;
export { computerAi };
