// Imports
const path = require("path");
const express = require("express");
const apiRoutes = require("./routes/api");

// Init
const server = express();

// Middleware / Setup
server.use(express.json());
server.use(express.static(path.join(__dirname, "public")));

// Routes
server.use("/api/cohorts/", apiRoutes);
server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Exports
module.exports = server;
