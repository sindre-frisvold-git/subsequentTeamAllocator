// Imports
const _ = require("lodash");
const allocationFunction = require("./randomScored"); // change to genetic..
const {
  createArray,
  createArray2D,
  forEachPair,
  copyArray2D,
} = require("../../utils");
const { getPeople } = require("../dbFunctions/people");
const { getWeights, updateWeights } = require("../dbFunctions/weights");

// given id, returns the new allocation using team names and people names
async function newAllocation(cohort_id, teams) {
  try {
    const [people, weights] = await Promise.all([
      getPeople(cohort_id), // do we really need all this info - or just use id?
      getWeights(cohort_id),
    ]);
    const numberTeams = teams.length;
    const actualNumberPeople = people.length;
    const maxTeamSize = Math.ceil(actualNumberPeople / numberTeams);
    const requiredNumberPeople = numberTeams * maxTeamSize;
    let paddedWeights = padWeights(requiredNumberPeople, weights);
    paddedWeights = stopDoublePlaceholder(actualNumberPeople, paddedWeights);
    const allocationWithPlaceholders = allocationFunction(
      numberTeams,
      maxTeamSize,
      paddedWeights
    );
    const allocation = removePlaceholders(
      actualNumberPeople,
      allocationWithPlaceholders
    );
    const formattedAllocation = formatAllocation(allocation, people, teams);
    const updatedWeights = calculateNewWeights(weights, allocation);
    await updateWeights(cohort_id, updatedWeights);
    return formattedAllocation;
    // update weights ()
  } catch (error) {
    console.log(error);
  }
}

// Return object formatted like {teamName : [peoplesNames]}
//  would this be more readable broken down into a couple of steps?
//  could each step be made more generic and used elsewhere?
// Note: currently just sending back person id - did we want the full person object?
function formatAllocation(allocation, people, teams) {
  return allocation.reduce(
    (store, team, index) => ({
      ...store,
      [teams[index]]: team.map((personIndex) => people[personIndex].id),
    }),
    {}
  );
}

function removePlaceholders(numberPeople, allocation) {
  console.log(`Number people: ${numberPeople}`);
  return allocation.map((team) =>
    team.reduce(
      (store, current) =>
        current >= numberPeople ? store : [...store, current],
      []
    )
  );
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

// remove placeholder weights - NOT CURRENTLY USED
function dePadWeights(requiredSize, weights) {
  return weights
    .map((row) => row.slice(0, requiredSize))
    .slice(0, requiredSize);
}

// make sure we don't get two placeholders in the same team
//  by making the pair weights infinity (this might need to be changed to just a large number)
function stopDoublePlaceholder(actualNumberPeople, weights) {
  const newWeights = copyArray2D(weights);
  const placeHolders = _.range(actualNumberPeople, newWeights.length);
  forEachPair(placeHolders, (a, b) => {
    newWeights[a][b] = newWeights[b][a] = Infinity;
  });
  return newWeights;
}

// I should probably make this pure...
function calculateNewWeights(weights, allocation) {
  let newWeights = copyArray2D(weights);
  allocation.forEach((team) => {
    forEachPair(team, (person1, person2) => {
      newWeights[person1][person2] = newWeights[person2][person1] =
        weights[person1][person2] + 1;
    });
  });
  return newWeights;
}

// Exports
module.exports = newAllocation;
