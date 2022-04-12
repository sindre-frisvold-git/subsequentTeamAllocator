// seed cohort table
exports.seed = async function (knex) {
  await knex("cohort").del();
  await knex("cohort").insert([{ id: 1, name: "Cohort1" }]);
};
