// Imports
const knex = require("knex");
const config = require("./knexfile");

// Init
const devDB = knex(config.development);

// Exports
module.exports = devDB;
