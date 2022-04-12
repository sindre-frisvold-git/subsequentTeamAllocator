// Import
const path = require("path");

// Config
module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: path.join(__dirname, "dev.sqlite3"),
    },
    useNullAsDefault: true,
  },
};
