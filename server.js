require("dotenv").config();
require("isomorphic-fetch");
const express = require("express");
const next = require("next");
const { dev, port } = require("./config/server.config");
const applyRoutes = require("./server/applyRoutes");

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  applyRoutes({
    server,
    renderer: app,
    fallback: handle
  });

  server.listen(port, err => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log(`> Main server listening on http://localhost:${port}`);
  });
});
