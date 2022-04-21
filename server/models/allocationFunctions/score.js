// Imports
const { forEachPair } = require("../../utils");

// Add scores to a single allocation
// Takes:
//  - allocation: 2d array (numberTeams * teamSize)
//  - weights: 2d array (requiredPeople * requiredPeople)
// Returns:
//   - scores: object
//    - teamScores: 1d array (score of every team)
//    - allocationScore: int (total score of all teams)
function score(allocation, weights) {
  const teamScores = allocation.map((team) => {
    let score = 0;
    forEachPair(
      team,
      (person1, person2) => (score += weights[person1][person2])
    );
    return score;
  });
  const allocationScore = teamScores.reduce(
    (total, teamScore) => total + teamScore,
    0
  );
  return { teamScores, allocationScore };
}

// Export
module.exports = { score };
