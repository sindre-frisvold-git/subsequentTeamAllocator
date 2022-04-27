// Imports
const { forEachPair } = require("./utils");

// Add scores to a single allocation
// Takes:
//  - allocation: 2d array (numberTeams * teamSize)
//  - weights: 2d array (requiredPeople * requiredPeople)
// Returns:
//   - scores: object
//    - teamScores: 1d array (score of every team)
//    - allocationScore: int (total score of all teams)
// NOTE: score currently linearly scales with number of previous parings for each paring.
//  This might be change to be non-linear (exponential). This handicap allocations with a pairing that has paired together many times previously.
//  E.g. scenario 1: one pair that has paired together 3 times and one pair that has paired together once - linear score: 4, exponential score: 10
//       scenario 2: two pairs that have paired together twice - linear score: 4, exponential score: 8
//       With linear scoring both scenarios are the same, with exponential scoring scenario 1 is more preferable
function score(allocation, weights, power = 2) {
  const teamScores = allocation.map((team) => {
    let score = 0;
    forEachPair(team, (person1, person2) => (score += Math.pow(weights[person1][person2], power)));
    return score;
  });
  const allocationScore = teamScores.reduce((total, teamScore) => total + teamScore, 0);
  return { allocation, teamScores, allocationScore };
}

// Export
module.exports = { score };
