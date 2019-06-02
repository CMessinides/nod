const routes = require("../config/routes.config");
const { dev, port, apiPort, apiRoot } = require("../config/server.config");

module.exports = function applyRoutes({ server, renderer, fallback }) {
  mountOrProxyApi(server);

  server.get(routes.notebook, (req, res) => {
    return renderer.render(req, res, "/notebook", { id: req.params.id });
  });

  server.get("/", (req, res) => {
    return renderer.render(req, res, "/index", req.query);
  });

  server.get("*", (req, res) => {
    return fallback(req, res);
  });
};

function mountOrProxyApi(server) {
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
}
