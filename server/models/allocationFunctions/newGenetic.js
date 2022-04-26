/*

Genetic :

1) Random Allocations (done)
2) Score Allocations (done - might need changing)
3) We pick the best N allocations
    a) Order teams within allocation
    b) cross over
    c) score all new allocations
    d) random mutations
    c) repeat step 3 X times
    * Stop if 0
4) return the best allocation at the end 

*/

// Imports
const _ = require('lodash')
const { forEachPair } = require('../../utils')
const { randomAllocations } = require('./allocations2')
const { score } = require('./score')

// Export
module.exports = randomScoredAllocation

function randomScoredAllocation(
  numberTeams,
  teamSize,
  weights,
  numberRandomAllocations = 10
) {
  const initAllo = randomAllocations(
    numberTeams,
    teamSize,
    numberRandomAllocations
  )
}
randomScoredAllocation(3, 3, weights)
