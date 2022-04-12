// Imports
const server = require("./server");

// Listen / Make Live
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
