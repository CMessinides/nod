require("dotenv").config();
const createApiServer = require("./api");
const { dev, apiPort, apiRoot } = require("./config/server.config");

const server = createApiServer({ dev, root: apiRoot });
server.listen(apiPort, err => {
  if (err) throw err;
  // eslint-disable-next-line no-console
  console.log(`> API server listening on http://localhost:${apiPort}`);
});
