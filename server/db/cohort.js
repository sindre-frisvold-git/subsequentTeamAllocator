// Imports
const devDB = require("./devDB");

// create cohort given name and return id
function addCohort(name, db = devDB) {
  return db("cohort").insert({ name });
}
// get a cohort by id
function getCohort(cohort_id, db = devDB) {
  return db("cohort").select().where("id", cohort_id).first();
}

// get all cohorts with count of people in each cohort
function getCohorts(db = devDB) {
  return db("cohort")
    .select(["cohort.*"])
    .leftJoin("people", "cohort.id", "people.cohort_id")
    .count("people.cohort_id as number")
    .groupBy("people.cohort_id");
}

// Exports
module.exports = { addCohort, getCohort, getCohorts };
