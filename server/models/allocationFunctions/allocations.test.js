// Imports
const {
  randomAllocation,
  randomAllocations,
  formatAllocation,
  removePlaceholders,
  getBestAllocation,
} = require("./allocations2");

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

//formatAllocation
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
  // it("Returns an object of the correct shape", () => {
  //   const allocation = [[0, 1], [2]];
  //   const teams = ["team0", "team1"];
  //   const people = [{ id: 0 }, { id: 1 }, { id: 2 }];
  //   const actual = formatAllocation(allocation, people, teams);
  //   expect.assertions(2);
  //   expect(Object.keys(actual).length).toBe(teams.length);
  //   expect(Array.isArray(actual[teams[0]])).toBe(true);
  // });
  // check team names are correct
  // check people's ids are correct
});

//removePlaceholders

//getBestAllocation
