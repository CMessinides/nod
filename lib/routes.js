export function redirectIfNecessary({ url, req, res, code = 301 } = {}) {
  if (req && req.url !== url) {
    res.writeHead(code, {
      Location: url
    });
    res.end();
  }
}
