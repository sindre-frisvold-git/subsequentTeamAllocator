// Imports
const { range, shuffle } = require("lodash");
// Exports
module.exports = {
  randomAllocation,
  randomAllocations,
  formatAllocation,
  removePlaceholders,
  getBestAllocation,
};

// Functions

// Return an array containing a given number of random allocations
// Takes:
//  - numberTeams: int
//  - teamSize: int
//  - numberAllocations: int (the number of random allocations to return)
// Returns:
//  - allocations: 3d array (array of allocation arrays which are 2d)
function randomAllocations(numberTeams, teamSize, numberAllocations) {
  return range(numberAllocations).map(() => randomAllocation(numberTeams, teamSize));
}

// Returns a random allocation of numbers between 0 and (numberTeams * teamSize - 1)
// Takes:
//  - numberTeams: int
//  - teamSize: int
// Returns:
//  - allocation: 2d array
// Note: would it be easier to read if it used people.ids rather than index???!
function randomAllocation(numberTeams, teamSize) {
  const shuffled = shuffle(range(numberTeams * teamSize));
  return range(numberTeams).map((team) =>
    range(teamSize).map((index) => shuffled[team * teamSize + index])
  );
}

// Returns the allocation with the lowest allocationScore
// Takes:
//  - allocations: 1d array (of Objects with allocation, teamScores and allocationScore keys)
// Returns:
//  - allocation: 2d array (of indexes from 0 to numberTeams x teamSize )
// Note: this might also return scores if required by the front end
function getBestAllocation(allocations) {
  const allocation = allocations.reduce((best, current) => {
    return best.allocationScore <= current.allocationScore ? best : current;
  });
  return allocation.allocation;
}

// Return an object with teams names and people id's
// Takes:
//  - allocation: 2d array (the index of people within the people array)
//  - people: 1d array (of objects for each person)
//  - teams: 1d array (of strings for team names)
// Returns:
//  - formatted allocation: object
//    - keys ware team names
//    - values are an array of people ids
function formatAllocation(allocation, people, teams) {
  return allocation.reduce(
    (store, team, index) => ({
      ...store,
      [teams[index]]: team.map((personIndex) => people[personIndex].id),
    }),
    {}
  );
}

// Remove placeholder ids from an allocation
// Takes:
//  - numberPeople: int
//  - allocation: 2d array
// Returns:
//  - allocation : 2d array (with placeholders removed)
function removePlaceholders(numberPeople, allocation) {
  return allocation.map((team) =>
    team.reduce((store, current) => (current >= numberPeople ? store : [...store, current]), [])
  );
}
