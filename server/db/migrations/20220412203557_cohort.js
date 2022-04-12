// create cohort table
exports.up = async (knex) => {
  return await knex.schema.createTable("cohort", (table) => {
    table.increments();
    table.string("name").notNullable();
    table.timestamps(true, true);
  });
};

// rollback cohort table
exports.down = async (knex) => {
  return await knex.schema.dropTable("cohort");
};
