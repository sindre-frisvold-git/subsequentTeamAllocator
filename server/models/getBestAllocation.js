// Imports
const { getPeople } = require("../db/people");
const { getWeights, updateWeights } = require("../db/weights");
const { formatWeights, calculateNewWeights } = require("./helper/weights");
const { removePlaceholders, formatAllocation } = require("./helper/allocations");

// Export
module.exports = getBestAllocation;

// function description
// Note: add a verbose parameter, when true, also return stats
async function getBestAllocation(cohortId, teams, allocationFunction) {
  try {
    const [people, weights] = await Promise.all([getPeople(cohortId), getWeights(cohortId)]);

    const numberTeams = teams.length;
    const numberPeople = people.length;
    const maxTeamSize = Math.ceil(numberPeople / numberTeams);
    const numberPlaces = numberTeams * maxTeamSize;

    const formattedWeights = formatWeights(weights, numberPeople, numberPlaces);
    let bestAllocation = allocationFunction(numberTeams, maxTeamSize, formattedWeights);
    bestAllocation = removePlaceholders(numberPeople, bestAllocation.apex.allocation);

    const newWeights = calculateNewWeights(weights, bestAllocation);
    await updateWeights(cohortId, newWeights);

    const formattedAllocation = formatAllocation(bestAllocation, people, teams);
    return formattedAllocation;
  } catch (error) {
    console.log(error);
    // log error and return what?
  }
}
