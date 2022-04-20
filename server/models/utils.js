// Imports
const _ = require("lodash");

function createArray(cols, fill = 0) {
  return _.range(cols).fill(fill);
}
function createArray2D(rows, cols, fill = 0) {
  return _.range(rows).map(() => createArray(cols, fill));
}

// make a pure function!
function forEachPair(array, callback) {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      callback(array[i], array[j]);
    }
  }
}

// Exports
module.exports = { createArray, createArray2D, forEachPair };
