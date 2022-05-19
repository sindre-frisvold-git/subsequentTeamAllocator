// to wire up:
// score()
// calculateNewWeights()
// sortAscending * Descending()
// createSqap2People2DAllocations()
// createArray2D()

const { calculateNewWeights } = require("./helper/weights");
const { score } = require("./helper/score");
const { sortAscendingByKey, sortDescendingByKey, createArray2D } = require("./helper/utils");
const { randomAllocation, randomAllocations } = require("./helper/allocations");
const { createSwap2People2DAllocations } = require("./genetic");
const getBestAllocation = require("./getBestAllocation");
// functions start
function randomScoredAllocation(numberTeams, teamSize, weights, numberRandomAllocations = 10) {
  const initAllo = randomAllocations(numberTeams, teamSize, numberRandomAllocations);
  return initAllo.map((allo) => score(allo, weights));
}

// 40 total allocations
// first all random
// then 10 best, 10 crossover, 10 mutations at random, 10 new random allocations
// get random check
// randomScoredAllocation()

// get 10 best check
function getNBestByScore(array, n = 10) {
  return sortAscendingByKey(array, "allocationScore").slice(0, n);
}

//get 10 crossover check
function scoreSwaps(array, weights) {
  return createSwap2People2DAllocations(array).map((swap) => score(swap, weights));
}
function getNBestCrossovers(array, n = 10, weights) {
  return getNBestByScore(scoreSwaps(array, weights), n);
}

// add all to one array
function combineArrays(...args) {
  let combo = [];
  // console.log(args, 'argsa')
  args.forEach((arg) => (combo = [...combo, ...arg]));
  return combo;
}

// Single generation call
function singleGeneration(teamSize, numberTeams, weights, survivors) {
  if (!survivors) {
    survivors = randomScoredAllocation(numberTeams, teamSize, weights);
  }
  // console.log(survivors)
  const randomPool = randomScoredAllocation(numberTeams, teamSize, weights);
  // const crossOverPool = getNBestCrossovers(survivors, 10, weights)

  return combineArrays(survivors, randomPool);
}

// n generations call
function bestOfNGenerations(teamSize, numberTeams, weights, n, nthLog = n / 10) {
  let survivors;
  let alphas = [];
  for (let i = 0; i < n; i++) {
    let currGen = singleGeneration(teamSize, numberTeams, weights, survivors);
    survivors = getNBestByScore(currGen);
    if (i % nthLog === 0) alphas.push(survivors[0]);
    if (survivors[0].allocationScore === 0) break;
  }
  const apex = getNBestByScore(alphas, 1)[0];
  return { alphas, apex };
}

//? obsolete wrapper funciton
function newGroupAllocation(teamSize, numberTeams, weights) {
  if (!weights) {
    const totalSize = teamSize * numberTeams;
    // console.log('weeights')
    weights = createArray2D(totalSize, totalSize);
    // console.log(weights)
    const apex = randomAllocation(teamSize, numberTeams);
    console.log(apex);
    const updatedWeights = calculateNewWeights(weights, apex);
    return { updatedWeights, apex };
  }
  const result = bestOfNGenerations(teamSize, numberTeams, weights, 1000);
  let apexAllocation = result.apex.allocation;
  const updatedWeights = calculateNewWeights(weights, apexAllocation);
  return { updatedWeights, apex: result.apex };
}

// function sortAscendingByKey(arrayOfObjects, sortKey) {
//   return arrayOfObjects.sort((a, b) => a[sortKey] - b[sortKey])
// }

const testAlloc = newGroupAllocation(3, 5);
console.log(testAlloc.updatedWeights);
console.log(newGroupAllocation(3, 5, testAlloc.updatedWeights));

getBestAllocation(3, ["a", "b", "c", "d"], newGroupAllocation);
