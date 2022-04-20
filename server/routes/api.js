// Imports
const express = require("express");
const {
  getCohorts,
  getCohort,
  addCohort,
} = require("../models/dbFunctions/cohort");
const { getPeople, addPeople } = require("../models/dbFunctions//people");
const { newWeights } = require("../models/dbFunctions//weights");
const newAllocation = require("../models/allocationFunctions/allocations");

// Init
const router = express.Router();

// get cohorts
router.get("/", async (req, res) => {
  try {
    const cohorts = await getCohorts();
    res.status(200).json(cohorts);
  } catch (error) {
    // make into generic error funct
    console.log(error); //need a persistent log
    res.status(500).json({ error: "error getting cohorts" });
  }
});

// get a cohort, the people, and the weights
router.get("/:id", async (req, res) => {
  try {
    const cohort_id = Number(req.params.id); //raise error if NaN?
    const [cohort, people] = await Promise.all([
      getCohort(cohort_id),
      getPeople(cohort_id),
    ]);
    res.status(200).json({ cohort, people });
  } catch (error) {
    console.log(error); //need a persistent log
    res.status(500).json({ error: "error getting cohort" });
  }
});

// add cohort - return cohort id
router.post("/", async (req, res) => {
  try {
    const { cohortName, people } = req.body;
    const [cohort_id] = await addCohort(cohortName);
    await Promise.all([
      addPeople(cohort_id, people),
      newWeights(cohort_id, people.length),
    ]);
    res.status(200).json({ cohort_id });
  } catch (error) {
    console.log(error); //need a persistent log
    res.status(500).json({ error: "error adding cohort" });
  }
});

// get new grouping
router.get("/:id/teams", async (req, res) => {
  // takes in team names array
  try {
    const cohort_id = req.params.id;
    const { teams } = req.body;
    const allocation = await newAllocation(cohort_id, teams);
    res.status(200).json({ allocation });
  } catch (error) {
    console.log(error); //need a persistent log
    res.status(500).json({ error: "error adding cohort" });
  }
});

// Export
module.exports = router;
