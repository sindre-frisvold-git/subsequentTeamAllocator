// Imports
const { range } = require("lodash");

// Creates a an arr of length size, filled wth a fill
// Takes:
//  - size: int (length of resulting array)
//  - fill: int, default 0 (value to fill array with)
// Returns:
//  - array: of length size filled with fill value
// Note: could let fill be a value or a function - if function run it to fill
function createArray(size, fill = 0) {
  return range(size).fill(fill);
}

// Creates a 2d array
// Takes:
//  - rows: int (length of outer array)
//  - cols: int (length of inner arrays)
//  - fill: int, default 0 (value to fill array with)
// Returns:
//  - array: of shape (rows * cols) filled with fill values
// Note: could change cols to also take in an array of lengths if you needed rows of different sizes
function createArray2D(rows, cols, fill = 0) {
  return range(rows).map(() => createArray(cols, fill));
}

// Apply a callback to unique pair in an array
// ignores order: e.g. treats [a][b] the same as [b][a]
// Takes:
//  - array: array
//  - callback: function that takes in two values for each pair
// Returns:
//  - undefined: applies callback with no return (impure function)
function forEachPair(array, callback) {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      callback(array[i], array[j]);
    }
  }
}

// Create a new copy of 2D array
// Takes:
//  - array2D: 2d array
// Returns:
//  - array: 2d array (copy of array2D)
// Note: needs to be completely refactored. It shouldn't care about the shape of the array
//  should return a copy of an array of any dimension
function copyArray2D(array2D) {
  return array2D.map((innerArray) => innerArray.slice());
}

// Converts an index for a 1D array to a 2D array
// Takes:
//  - index1D: int
//  - innerArraySize: int (length of inner arrays - assumes all same length)
// Returns:
//  - index2D: array of length 2 ([row, col])
function index1DTo2D(index1D, innerArraySize) {
  return [Math.floor(index1D / innerArraySize), index1D % innerArraySize];
}

// Sorts an an array of objects in descending order based on a key
// Takes:
//  - arrayOfObjects: array (...of objects...)
//  - sortKey: string (key in object that should used for sorting)
// Returns:
//  - sortedArray: array (of objects)
// Note: what if key value isn't an int? Could it take in a comparison function?
//  I think lodash might have already implemented this...
function sortDescendingByKey(arrayOfObjects, sortKey) {
  return arrayOfObjects.sort((a, b) => b[sortKey] - a[sortKey]);
}
function sortAscendingByKey(arrayOfObjects, sortKey) {
  return arrayOfObjects.sort((a, b) => a[sortKey] - b[sortKey]);
}

// Exports
module.exports = {
  createArray,
  createArray2D,
  forEachPair,
  copyArray2D,
  index1DTo2D,
  sortDescendingByKey,
  sortAscendingByKey,
};
