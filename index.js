// Start the server programmatically
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res, parse(req.url, true));
  }).listen(port, err => {
    if (err) throw err;
    /* eslint-disable no-console */
    console.log(`> Ready on http://localhost:${port}`);
  });
});
