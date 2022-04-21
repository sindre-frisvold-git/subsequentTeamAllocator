// Imports
const { score } = require("./score");

describe("Score function - scores an allocation", () => {
  it("Returns an object with teamScore and allocationScore keys", () => {
    const allocation = [];
    const weights = [];
    const actual = score(allocation, weights);
    expect.assertions(3);
    expect(actual).toHaveProperty("teamScores");
    expect(actual).toHaveProperty("allocationScore");
    expect(Object.keys(actual).length).toBe(2);
  });
  it("teamScores to be calculated correctly using weights", () => {
    const allocation = [
      [0, 1],
      [2, 3],
    ];
    const weights = [
      [0, 2, 0, 0],
      [2, 0, 0, 0],
      [0, 0, 0, 6],
      [0, 0, 6, 0],
    ];
    const actual = score(allocation, weights);
    const expected = [2, 6];
    expect.assertions(2);
    expect(actual.teamScores.length).toBe(2);
    expect(actual.teamScores).toEqual(expected);
  });
  it("allocationScore to be calculated correctly and the sum of teamScores", () => {
    const allocation = [
      [0, 1],
      [2, 3],
    ];
    const weights = [
      [0, 2, 0, 0],
      [2, 0, 0, 0],
      [0, 0, 0, 6],
      [0, 0, 6, 0],
    ];
    const { allocationScore } = score(allocation, weights);
    const expected = 8;
    expect.assertions(2);
    expect(typeof allocationScore).toBe("number");
    expect(allocationScore).toEqual(expected);
  });
});
