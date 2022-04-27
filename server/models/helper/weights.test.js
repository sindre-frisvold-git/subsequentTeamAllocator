// Imports
const { padWeights, stopDoublePlaceholder, calculateNewWeights } = require("./weights");

describe("padWeights function - adds 0 padding to a 2d array", () => {
  it("Returned array has the correct dimensions", () => {
    const requiredSize = 4;
    const weights = [
      [0, 0],
      [0, 0],
    ];
    const actual = padWeights(requiredSize, weights);
    expect.assertions(3);
    expect(Array.isArray(actual)).toBe(true);
    expect(actual.length).toBe(4);
    expect(actual[0].length).toBe(4);
  });
  it("Returned array should keep original values", () => {
    const requiredSize = 4;
    const weights = [
      [1, 2],
      [3, 4],
    ];
    const actual = padWeights(requiredSize, weights);
    const actualSum = actual.flat().reduce((store, current) => store + current, 0);
    const expectedSum = 10;
    expect.assertions(2);
    expect(actual[1][1]).toBe(4);
    expect(actualSum).toBe(expectedSum);
  });
});

describe("stopDoublePlaceholder - changes weight of two placeholders to be Infinity", () => {
  it("Returns new array of same shape", () => {
    const actualNumberPeople = 1;
    const weights = [
      [1, 1],
      [1, 1],
    ];
    const actual = stopDoublePlaceholder(actualNumberPeople, weights);
    expect.assertions(3);
    expect(Array.isArray(actual)).toBe(true);
    expect(actual.length).toBe(2);
    expect(actual[0].length).toBe(2);
  });
  it("Intersection between placeholders should be Infinity", () => {
    const actualNumberPeople = 1;
    const weights = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const actual = stopDoublePlaceholder(actualNumberPeople, weights);
    expect(actual[1][2]).toBe(Infinity);
    expect(actual[2][1]).toBe(Infinity);
    expect(actual[0][0]).toBe(0);
  });
});

describe("calculateNewWeights - returns new weights array updated based on allocation", () => {
  it("Returns array of the correct size", () => {
    const weights = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    const allocation = [
      [0, 1],
      [2, 3],
    ];
    const actual = calculateNewWeights(weights, allocation);
    expect.assertions(3);
    expect(Array.isArray(actual)).toBe(true);
    expect(actual.length).toBe(4);
    expect(actual[0].length).toBe(4);
  });
  it("Doesn't change non-pairs", () => {
    const weights = [
      [0, 0, 1, 0],
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    const allocation = [
      [0, 1],
      [2, 3],
    ];
    const actual = calculateNewWeights(weights, allocation);
    expect.assertions(4);
    expect(actual[0][2]).toBe(1);
    expect(actual[0][2]).toBe(1);
    expect(actual[1][3]).toBe(0);
    expect(actual[3][1]).toBe(0);
  });
  it("Adds 1 to pairs", () => {
    const weights = [
      [0, 2, 1, 0],
      [2, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    const allocation = [
      [0, 1],
      [2, 3],
    ];
    const actual = calculateNewWeights(weights, allocation);
    expect.assertions(4);
    expect(actual[0][1]).toBe(3);
    expect(actual[1][0]).toBe(3);
    expect(actual[2][3]).toBe(1);
    expect(actual[3][2]).toBe(1);
  });
});
