// seed people table
exports.seed = async function (knex) {
  await knex("people").del();
  await knex("people").insert([
    { id: 1, name: "Person1", cohort_id: 1 },
    { id: 2, name: "Person2", cohort_id: 1 },
    { id: 3, name: "Person3", cohort_id: 1 },
    { id: 4, name: "Person4", cohort_id: 1 },
    { id: 5, name: "Person5", cohort_id: 1 },
  ]);
};
