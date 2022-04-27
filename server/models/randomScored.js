// Imports
const _ = require("lodash");
const { forEachPair } = require("./helper/utils");

// Export
module.exports = randomScoredAllocation;

function randomScoredAllocation(numberTeams, teamSize, weights, numberRandomAllocations = 10) {
  const trailAllocations = _.range(numberRandomAllocations).map(() => {
    const allocation = randomAllocation(numberTeams, teamSize);
    const scores = scoreAllocation(allocation, weights);
    return { allocation, ...scores };
  });
  // get best allocation (would be a better way be to sort and get the first?)
  const bestAllocation = trailAllocations.reduce((best, current) => {
    return best.allocationScore <= current.allocationScore ? best : current;
  });
  return bestAllocation.allocation; // we might also want to send the number of past pairings with this allocation (e.g. score or f(score))
}

// given the number of teams and the size of the teams
//  return an numberTeams x teamSize array filled with numbers from 0 - (numberTeams * teamSize)
function randomAllocation(numberTeams, teamSize) {
  const shuffled = _.shuffle(_.range(numberTeams * teamSize));
  return _.range(numberTeams).map((team) =>
    _.range(teamSize).map((index) => shuffled[team * teamSize + index])
  );
}

// given an allocation and weights, return an object with teamScores array and allocationScore
// Note: score currently linearly scales with number of previous groupings
//  this might be changed to exponentially scale to punish grouping pairs
//  that might have grouped together a lot (using weights[person1][person2]**2 or similar)
// e.g. a team that has 2 pairs that have grouped together will be more likely than a group that has 1 pair that has grouped together 3 times
function scoreAllocation(allocation, weights) {
  const teamScores = allocation.map((team) => {
    let score = 0;
    forEachPair(team, (person1, person2) => (score += weights[person1][person2]));
    return score;
  });
  const allocationScore = teamScores.reduce((total, teamScore) => total + teamScore, 0);
  // keep teamScores as needed for genetic algorithm
  return { teamScores, allocationScore };
}
