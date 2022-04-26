// Imports
const _ = require('lodash')

// create a 1d array
function createArray(cols, fill = 0) {
  return _.range(cols).fill(fill)
}

// create 2d array
function createArray2D(rows, cols, fill = 0) {
  return _.range(rows).map(() => createArray(cols, fill))
}
//Kang - wouldn't this miss some comparisons?
// make a pure function!
function forEachPair(array, callback) {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      callback(array[i], array[j])
    }
  }
}

function copyArray2D(array2D) {
  return array2D.map((innerArray) => innerArray.slice())
}

// Exports
module.exports = { createArray, createArray2D, forEachPair, copyArray2D }
