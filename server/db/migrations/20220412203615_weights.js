// create weights table
exports.up = async (knex) => {
  return await knex.schema.createTable("weights", (table) => {
    table.increments();
    table.string("weights").notNullable();
    table
      .integer("cohort_id")
      // .notNullable()
      // .unique()
      .references("id")
      .inTable("cohort");
    table.timestamps(true, true);
  });
};

// rollback weights table
exports.down = async (knex) => {
  return await knex.schema.dropTable("weights");
};
