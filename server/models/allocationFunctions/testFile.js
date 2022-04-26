const { getPeople } = require('../dbFunctions/people')
const { getWeights, updateWeights } = require('../dbFunctions/weights')

const [people, weights] = await Promise.all([
  getPeople(cohort_id), // do we really need all this info - or just use id?
  getWeights(cohort_id),
])
