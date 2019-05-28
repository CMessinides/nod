const express = require("express");
const api = require("./api");

const port = parseInt(process.env.API_PORT, 10) || 3001;
const server = express();

server.use("/", api);

server.listen(port, err => {
  if (err) throw err;
  // eslint-disable-next-line no-console
  console.log(`> API server listening on http://localhost:${port}`);
});
