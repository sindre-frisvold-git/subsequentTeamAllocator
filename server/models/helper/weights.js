// Imports
const { range } = require("lodash");
const { createArray, createArray2D, copyArray2D, forEachPair } = require("./utils");

// Export
module.exports = { padWeights, stopDoublePlaceholder, calculateNewWeights, formatWeights };

// Functions

// add docs string !!!!
function formatWeights(weights, numberPeople, numberPlaces) {
  const placeholders = padWeights(numberPlaces, weights);
  return stopDoublePlaceholder(numberPeople, placeholders);
}

// Add 0 padding to 2d array
// Takes:
//  - requiredSize: int (number rows/cols the final array should have)
//  - weights: 2d array
// Returns:
//  - paddingArray: 2d array (of size requiredSize x requiredSize)
function padWeights(requiredSize, weights) {
  const toAdd = requiredSize - weights.length;
  return [
    ...weights.map((row) => [...row, ...createArray(toAdd)]),
    ...createArray2D(toAdd, requiredSize),
  ];
}

// Change to weights of two placeholders to be Infinity
//  So that no group will ever has 2 placeholders/empty slots
// Takes:
//  - numberPeople: int
//  - weights: 2d array
// Returns
//  - updatedWeights: 2d array
function stopDoublePlaceholder(numberPeople, weights) {
  const newWeights = copyArray2D(weights);
  const placeHolders = range(numberPeople, newWeights.length);
  forEachPair(placeHolders, (a, b) => {
    newWeights[a][b] = newWeights[b][a] = Infinity;
  });
  return newWeights;
}

// Calculate new weights based on allocation
//  This should add one for each paring allocated
// Takes:
//  - weights: 2d array (old weights used to sore allocation)
//  - allocation: 2d array (with placeholders removed)
// Returns
//  - newWeights: 2d array (updated with allocation parings)
function calculateNewWeights(weights, allocation) {
  let newWeights = copyArray2D(weights);
  allocation.forEach((team) => {
    forEachPair(team, (person1, person2) => {
      newWeights[person1][person2] = newWeights[person2][person1] = weights[person1][person2] + 1;
    });
  });
  return newWeights;
}
