// Imports
const path = require("path");
const express = require("express");

// Init
const server = express();

// Middleware / Setup
server.use(express.json());
server.use(express.static(path.join(__dirname, "public")));

// Routes
// api routes go here...
server.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Exports
module.exports = server;
