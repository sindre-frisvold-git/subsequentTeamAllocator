// Imports
const devDB = require("./devDB");

// add people given an array of objects (names/urls), and group id
function addPeople(cohort_id, people, db = devDB) {
  return db("people").insert(people.map((person) => ({ ...person, cohort_id })));
}

// get all people given a cohort id
function getPeople(cohort_id, db = devDB) {
  return db("people").select().where("cohort_id", cohort_id);
}

// exports
module.exports = { addPeople, getPeople };

// To do
//  update Person
