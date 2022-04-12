// create people table
exports.up = async (knex) => {
  return await knex.schema.createTable("people", (table) => {
    table.increments();
    table.string("name").notNullable();
    table.string("imageURL");
    table
      .integer("cohort_id")
      // .notNullable()
      .references("id")
      .inTable("cohort");
    table.timestamps(true, true);
  });
};

// rollback people table
exports.down = async (knex) => {
  return await knex.schema.dropTable("people");
};
