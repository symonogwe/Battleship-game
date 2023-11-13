import Ship from "./Ship";

const ship1 = new Ship(5);
// tests if ship has required properties
test("Tests if our ship has exact properties", () => {
  expect(ship1).toHaveProperty("length", 5);
  expect(ship1).toHaveProperty("hits", 0);
  expect(ship1).toHaveProperty("sunk", false);
});

// tests if ship has required methods
ship1.hit = jest.fn();
ship1.hit();

ship1.isSunk = jest.fn();
ship1.isSunk();

test("Tests if our ship has exact methods", () => {
  expect(ship1.hit.mock.calls).toHaveLength(1);
  expect(ship1.isSunk.mock.calls).toHaveLength(1);
});

// tests whether hit method increases hit property
test("tests whether hit method increases hit property", () => {
  const ship2 = new Ship(3);
  ship2.hit = jest.fn(() => {
    ship2.hits++;
    return ship2.hits;
  });
  ship2.hit();
  ship2.hit();
  ship2.hit();

  expect(ship2.hit.mock.results[0].value).toBe(1);
  expect(ship2.hit.mock.results[1].value).toBe(2);
  expect(ship2.hit.mock.results[2].value).toBe(3);
});

// tests whether isSunk functionality works
test("tests whether isSunk functionality works", () => {
  const ship3 = new Ship(2);
  ship3.hits = 2;

  ship3.isSunk = jest.fn(() => {
    if (ship3.hits === ship3.length) {
      ship3.sunk = true;
      return ship3.isSunk;
    }
    return ship3.sunk;
  });
  ship3.isSunk();

  expect(ship3.isSunk.mock.results[0].value).toBeTruthy();
});
