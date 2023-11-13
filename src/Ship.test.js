// ship object
const ship1 = new Ship(5);
// mock ship functions
ship1.prototype.hit = jest.fn(() => {
  this.hits++;
  return this.hits;
});

ship1.prototype.isSunk = jest.fn(() => {
  if (this.length === this.hits) {
    this.sunk = true;
    return "ship is sunk";
  }
  return "ship is not sunk";
});

test("Tests the ship object has exact properties", () => {
  expect(ship1).toEqual({
    length: 5,
    hits: 0,
    sunk: false,
  });
});

test("Tests the ship object has exact methods", () => {
  expect(ship1.hit.mock.results[0].value).toBe(1);
  expect(ship1.isSunk.mock.results[0].value).toBe("ship is not sunk");
});
