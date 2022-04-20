// Imports
const devDB = require("../../db/devDB");
const { createArray2D } = require("../../utils");

// getWeights
// Note: needs complete refactor
async function getWeights(cohort_id, db = devDB) {
  try {
    const weights = await db("weights")
      .select("weights")
      .where("weights.cohort_id", cohort_id)
      .first();
    return Promise.resolve(JSON.parse(weights.weights));
  } catch (error) {
    console.log(error); // do real logging
    return Promise.reject("Could not find weights"); //this can be handled better...
  }
}

// newWeights
// what should be returned here???
function newWeights(cohort_id, n, db = devDB) {
  const weightsMatrix = initWeights(n);
  const weightsString = JSON.stringify(weightsMatrix);
  return db("weights").insert({ cohort_id, weights: weightsString });
}

// initWeights
function initWeights(n) {
  return createArray2D(n, n);
}

// updateWeights
// Note: This might be better to use the weights.id rather than cohort_id?
// Note: does this want to update OR insert?
function updateWeights(cohort_id, weightsMatrix, db = devDB) {
  const weightsString = JSON.stringify(weightsMatrix);
  return db("weights")
    .where("weights.cohort_id", cohort_id)
    .update({ weights: weightsString, cohort_id });
}

// Exports
module.exports = { getWeights, updateWeights, initWeights, newWeights };
