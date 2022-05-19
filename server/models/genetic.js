// Imports
const _ = require("lodash");
module.exports = { createSwap2People2DAllocations };
// similar to the random, but needs:
//  - var: number mutations
//  - var: generations
//  - var: descendants
//  - var: starting allocations
//  - func: randomMutations
//  - func: swap2People2D / swaps
//  - readme on how genetic algorithms work
//  main logic:
//    - generate (starting allocations) random starting allocations
//    - score these (here???)
//    - while best score is not 0, loop (generation) times:
//      - add new candidates to the allocations via swap2People2D
//      - add make a couple of random mutations
//      - score all allocations (or score as they're created??)
//      - get the top (descendants) options (or all with the best score?)
//      - ?do we need to shuffle these to break something staying based on location?
//    - return the best option after all of this

// prime candidate for refactoring - do we pass in one allocation or all?
function createSwap2People2DAllocations(allocations) {
  const newAllocations = [];
  allocations.forEach((allo) => {
    let scoredTeams = allo.allocation.map((team, index) => ({
      team,
      score: allo.teamScores[index],
    }));
    const sortedTeams = sortDescending(scoredTeams, "score").map((team) => team.team);

    // swap someone out of the worst (first team)
    // make every combination of this (e.g. new allocation for every person they could swap with)
    const teamSize = allocation[0].team.length; // just pass these in?!
    const totalPeople = teamSize * allocation.length;
    for (let person1 = 0; person1 < teamSize; person1++) {
      for (let person2 = teamSize; person2 < totalPeople; person2++) {
        const swappedPeople = swap2People2D(scoredTeams, person1, person2);
        // add to new Allocations
        // OR score and add??
      }
    }
  });
}

// Swap two people in a 2D array given 1d index
// There MUST be a cleaner way to do this...
function swap2People2D(allocation, person1, person2) {
  const crossedAllocation = copyArray2D(allocation);
  const [p1Team, p1Person] = index1DTo2D(person1);
  const [p2Team, p2Person] = index1DTo2D(person2);
  crossedAllocation[p1Team][p1Person] = allocation[p2Team][p2Person];
  crossedAllocation[p2Team][p2Person] = allocation[p1Team][p1Person];
  return crossedAllocation;
}

function sortDescending(arrayOfObjects, sortKey) {
  return arrayOfObjects.sort((a, b) => b[sortKey] - a[sortKey]);
}

function index1DTo2D(index, teamSize) {
  return [[Math.floor(index / teamSize)], [index % teamSize]];
}

function copyArray2D(array2D) {
  return array2D.map((innerArray) => innerArray.slice());
}
