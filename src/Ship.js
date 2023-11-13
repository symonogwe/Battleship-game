// Ship class
class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  }
  hit() {
    this.hits++;
  }
  isSunk() {
    if (this.length === this.hits) {
      this.sunk = true;
    }
  }
}

export default Ship;
