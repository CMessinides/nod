require("dotenv").config();
const express = require("express");
const next = require("next");
const { routes } = require("./routes");
const { dev, port, apiPort, apiRoot } = require("./config/server.config");

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  if (dev) {
    // In dev mode, proxy the auto-reloading API server
    const proxy = require("express-http-proxy");
    server.use(apiRoot, proxy(`http://localhost:${apiPort}`));
    // eslint-disable-next-line no-console
    console.log(`> Proxying API at http://localhost:${port}${apiRoot}`);
  } else {
    // In production, mount the API server as a sub-app
    const createApiServer = require("./api");
    server.use(apiRoot, createApiServer({ dev }));
    // eslint-disable-next-line no-console
    console.log(`> Mounting API at http://localhost:${port}${apiRoot}`);
  }

  server.get(routes.notebook, (req, res) => {
    return app.render(req, res, "/notebook", { id: req.params.id });
  });

  server.get("/", (req, res) => {
    return app.render(req, res, "/index", req.query);
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log(`> Main server listening on http://localhost:${port}`);
  });
});
