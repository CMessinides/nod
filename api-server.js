const createApiServer = require("./api");

const port = parseInt(process.env.API_PORT, 10) || 3001;
const dev = process.env.NODE_ENV !== "produciton";

const server = createApiServer({ dev });

server.listen(port, err => {
  if (err) throw err;
  // eslint-disable-next-line no-console
  console.log(`> API server listening on http://localhost:${port}`);
});
