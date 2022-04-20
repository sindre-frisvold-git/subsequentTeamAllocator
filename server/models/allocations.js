// Imports
const _ = require("lodash");
const allocationFunction = require("./randomScored"); // change to genetic..
const { createArray, createArray2D, forEachPair } = require("./utils");
const { getPeople } = require("../models/people");
const { getWeights, updateWeights } = require("../models/weights");

// given id, returns the new allocation using team names and people names
async function newAllocation(cohort_id, teams) {
  try {
    const [people, weights] = await Promise.all([
      getPeople(cohort_id),
      getWeights(cohort_id),
    ]);
    const numberTeams = teams.length;
    const actualNumberPeople = people.length;
    const maxTeamSize = Math.ceil(actualNumberPeople / numberTeams);
    const requiredNumberPeople = numberTeams * maxTeamSize;
    let paddedWeights = padWeights(requiredNumberPeople, weights);
    paddedWeights = stopDoublePlaceholder(actualNumberPeople, paddedWeights);
    const allocation = allocationFunction(
      numberTeams,
      maxTeamSize,
      paddedWeights
    );
    return allocation;
    // format allocation (remove placeholders, add team names and peoples names)
    // update weights ()
    // format allocation
    // return allocation
  } catch (error) {
    console.log(error);
  }
}

//--- Should these functions be in the weights module?
//--- Does this all need to be changed?

// Add placeholder weights to make up team size
function padWeights(requiredSize, weights) {
  const toAdd = requiredSize - weights.length;
  return [
    ...weights.map((row) => [...row, ...createArray(toAdd)]),
    ...createArray2D(toAdd, requiredSize),
  ];
}

// remove placeholder weights
function dePadWeights(requiredSize, weights) {
  return weights
    .map((row) => row.slice(0, requiredSize))
    .slice(0, requiredSize);
}

// make sure we don't get two placeholders in the same team
//  by making the pair weights infinity (this might need to be changed to just a large number)
function stopDoublePlaceholder(actualNumberPeople, weights) {
  const newWeights = [...weights];
  const placeHolders = _.range(actualNumberPeople, newWeights.length);
  forEachPair(placeHolders, (a, b) => {
    newWeights[a][b] = newWeights[b][a] = Infinity;
  });
  return newWeights;
}

// Exports
module.exports = newAllocation;
