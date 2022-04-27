// Imports
const {
  randomAllocation,
  randomAllocations,
  formatAllocation,
  removePlaceholders,
  getBestAllocation,
} = require("./allocations");

// Tests
describe("randomAllocation function returns a random allocation", () => {
  it("Returns array of correct shape", () => {
    const numberTeams = 2;
    const teamSize = 3;
    const actual = randomAllocation(numberTeams, teamSize);
    expect.assertions(4);
    expect(Array.isArray(actual)).toBe(true);
    expect(actual.length).toBe(2);
    expect(Array.isArray(actual[0])).toBe(true);
    expect(actual[0].length).toBe(3);
  });
  it("Returned array has numbers from 0 to number teams * teamSize - 1", () => {
    const numberTeams = 2;
    const teamSize = 3;
    const actual = randomAllocation(numberTeams, teamSize);
    expect.assertions(3);
    expect(Math.min(...actual.flat())).toBe(0);
    expect(Math.max(...actual.flat())).toBe(numberTeams * teamSize - 1);
    expect(actual.flat().sort()[2]).toBe(2);
  });
  // Add test from randomness!
});

describe("randomAllocations function returns multiple allocations", () => {
  it("Returns an array of the correct shape", () => {
    const numberTeams = 2;
    const teamSize = 1;
    const numberAllocations = 4;
    const actual = randomAllocations(numberTeams, teamSize, numberAllocations);
    expect.assertions(4);
    expect(Array.isArray(actual)).toBe(true);
    expect(actual.length).toBe(4);
    expect(Array.isArray(actual[0])).toBe(true);
    expect(actual[0].length).toBe(2);
  });
  // could check if randomAllocation is called the correct number of times
});

describe("formatAllocation returns an object with keys as team names and values as arrays of ids", () => {
  it("Returns an object of the correct shape", () => {
    const allocation = [[0, 1], [2]];
    const teams = ["team0", "team1"];
    const people = [{ id: 0 }, { id: 1 }, { id: 2 }];
    const actual = formatAllocation(allocation, people, teams);
    expect.assertions(2);
    expect(Object.keys(actual).length).toBe(teams.length);
    expect(Array.isArray(actual[teams[0]])).toBe(true);
  });
  it("Returns an object with the correct team names", () => {
    const allocation = [[0, 1], [2]];
    const teams = ["team0", "team1"];
    const people = [{ id: 0 }, { id: 1 }, { id: 2 }];
    const actual = formatAllocation(allocation, people, teams);
    expect.assertions(2);
    expect(actual).toHaveProperty(teams[0]);
    expect(actual).toHaveProperty(teams[1]);
  });
  it("Correctly swaps index with id", () => {
    const allocation = [[0, 1], [2]];
    const teams = ["team0", "team1"];
    const people = [{ id: 0 }, { id: 1 }, { id: 2 }];
    const actual = formatAllocation(allocation, people, teams);
    expect.assertions(2);
    expect(actual).toHaveProperty(teams[0]);
    expect(actual).toHaveProperty(teams[1]);
  });
});

//removePlaceholders
describe("removePlaceholders function removes placeholder ids from an array", () => {
  it("Returned array has the correct number of teams", () => {
    const allocation = [
      [0, 3],
      [4, 1],
      [2, 5],
    ];
    const numberPeople = 3;
    const actual = removePlaceholders(numberPeople, allocation);
    expect.assertions(2);
    expect(actual.length).toBe(3);
    expect(actual.flat().length).toBe(3);
  });
  it("Returned array removed correct ids", () => {
    const allocation = [
      [0, 3],
      [4, 1],
      [2, 5],
    ];
    const numberPeople = 3;
    const actual = removePlaceholders(numberPeople, allocation);
    expect.assertions(2);
    expect(actual[0]).not.toContain(3);
    expect(actual.flat().every((entry) => entry < numberPeople)).toBe(true);
  });
});

describe("getBestAllocation function returns the best allocation", () => {
  it("Returns an array of the correct shape", () => {
    const allocations = [
      {
        allocation: [
          [0, 1],
          [2, 3],
        ],
        teamScores: [0, 2],
        allocationScore: 2,
      },
      {
        allocation: [
          [3, 1],
          [2, 0],
        ],
        teamScores: [1, 0],
        allocationScore: 1,
      },
    ];
    const actual = getBestAllocation(allocations);
    expect.assertions(4);
    expect(Array.isArray(actual)).toBe(true);
    expect(actual.length).toBe(2);
    expect(actual[0].length).toBe(2);
    expect(actual.flat().length).toBe(4);
  });
  it("Returns the allocation with the lowest allocationScore", () => {
    const allocations = [
      {
        allocation: [
          [0, 1],
          [2, 3],
        ],
        teamScores: [0, 2],
        allocationScore: 2,
      },
      {
        allocation: [
          [3, 1],
          [2, 0],
        ],
        teamScores: [1, 0],
        allocationScore: 1,
      },
    ];
    const actual = getBestAllocation(allocations);
    expect.assertions(1);
    expect(actual).toEqual([
      [3, 1],
      [2, 0],
    ]);
  });
});
