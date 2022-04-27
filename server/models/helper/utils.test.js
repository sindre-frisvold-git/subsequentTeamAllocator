// Imports
const {
  createArray,
  createArray2D,
  forEachPair,
  copyArray2D,
  index1DTo2D,
  sortDescendingByKey,
} = require("./utils");

describe("createArray function returns a filed array of a given size", () => {
  it("Returns an array of the correct size and filled with correct values", () => {
    const size = 6;
    const fill = 10;
    const actual = createArray(size, fill);
    const set = new Set(actual);
    expect.assertions(4);
    expect(Array.isArray(actual)).toBe(true);
    expect(actual.length).toBe(size);
    expect(actual).toContain(fill);
    expect(set.size).toBe(1);
  });
});

describe("createArray2D function returns a filled 2D array", () => {
  it("Returns a 2d array of the correct shape and filled with correct values", () => {
    const rows = 6;
    const cols = 4;
    const fill = 10;
    const actual = createArray2D(rows, cols, fill);
    const set = new Set(actual.flat());
    expect.assertions(4);
    expect(Array.isArray(actual)).toBe(true);
    expect(actual.flat().length).toBe(rows * cols);
    expect(actual[0]).toContain(fill);
    expect(set.size).toBe(1);
  });
});

describe("forEachPair function applies callback for each unique pair in array", () => {
  it("Returns a 2d array of the correct shape and filled with correct values", () => {
    const callback = (a, b) => sideEffectArray.push(a + b);
    const sideEffectArray = [];
    const pairArray = [1, 4, 2, 3];
    forEachPair(pairArray, callback);
    expect.assertions(2);
    expect(sideEffectArray.length).toBe(6);
    expect(sideEffectArray).toEqual([5, 3, 4, 6, 7, 5]);
  });
});

describe("copyArray2D function creates a copy of a 2d array", () => {
  it("Returned array is the correct shape", () => {
    const initialArray = [
      [0, 1],
      [3, 2],
    ];
    const actual = copyArray2D(initialArray);
    expect.assertions(2);
    expect(actual.length).toBe(2);
    expect(actual.flat().length).toBe(4);
  });
  it("Returned array values aren't references", () => {
    const initialArray = [
      [0, 1],
      [3, 2],
    ];
    const actual = copyArray2D(initialArray);
    initialArray[0][0] = 10;
    expect.assertions(1);
    expect(actual[0][0]).not.toBe(initialArray[0][0]);
  });
});

describe("index1DTo2D function returns a 2d index from a id index", () => {
  it("Returns an array of length 2", () => {
    const index1D = 0;
    const innerArraySize = 2;
    const actual = index1DTo2D(index1D, innerArraySize);
    expect.assertions(2);
    expect(Array.isArray(actual)).toBe(true);
    expect(actual.length).toBe(2);
  });
  it("Returns correct 2d indexes", () => {
    const firstIndex = index1DTo2D(0, 2);
    const secondGroup = index1DTo2D(4, 4);
    const lastIndex = index1DTo2D(14, 5);
    expect.assertions(3);
    expect(firstIndex).toEqual([0, 0]);
    expect(secondGroup).toEqual([1, 0]);
    expect(lastIndex).toEqual([2, 4]);
  });
});

describe("sortDescendingByKey function returns a sorted array", () => {
  it("Returns an array sorted in descending order", () => {
    const array = [{ key: 2 }, { key: 3 }, { key: 1 }];
    const actual = sortDescendingByKey(array, "key");
    expect.assertions(4);
    expect(Array.isArray(actual)).toBe(true);
    expect(actual.length).toBe(3);
    expect(actual[0].key).toBe(3);
    expect(actual[2].key).toBe(1);
  });
});
