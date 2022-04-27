// Imports
const { randomAllocations, getBestAllocation } = require("./helper/allocations");
const { score } = require("./helper/score");

// Exports
module.exports = randomAllocator;

// Returns an allocation
// This allocations is chosen as the best from N random ones
// Takes:
//  - numberTeams: int
//  - teamSize: int
//  -weights: 2d array (of shape (numberTeams * teamSize) x (numberTeams * teamSize))
//  - n : int, default 100 (number of random allocations to consider)
// Returns:
//  - allocation: 2d array (of numbers between 0 and (numberTeams * teamSize - 1))
// Note: add a verbose parameter, when true give back stats (e.g. best score, worst score, average score, standard deviation, etc.)
// Note: use Sindre's randomScored function when possible
function randomAllocator(numberTeams, teamSize, weights, n = 100) {
  const allocations = randomAllocations(numberTeams, teamSize, n);
  const scoredAllocations = allocations.map((allocation) => score(allocation, weights));
  return getBestAllocation(scoredAllocations);
}
