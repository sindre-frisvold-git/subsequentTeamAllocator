// seed weights table
exports.seed = async function (knex) {
  await knex("weights").del();
};
