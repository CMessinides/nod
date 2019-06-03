function createClientRoute(route, params = {}) {
  if (typeof route !== "string") {
    throw new Error(`Route must be a string; got ${route}.`);
  }

  const queryString = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join("&");
  return queryString ? route + "?" + queryString : route;
}

function createServerRoute(route, params = {}) {
  if (typeof route !== "string") {
    throw new Error(`Route must be a string; got ${route}.`);
  }

  Object.keys(params).forEach(key => {
    route = route.replace(`:${key}`, params[key]);
  });
  return route;
}

function replaceOrRedirect({
  route,
  params = {},
  req,
  res,
  router,
  code = 301
} = {}) {
  const routeTo = createServerRoute(route, params);
  if (req) {
    // redirect on the server
    // if req is present, so is res, so we don't bother checking again
    if (req.url !== routeTo) {
      res.writeHead(code, {
        Location: routeTo
      });
      res.end();
    }
  } else {
    // "redirect" on the client by replacing the URL in the location bar
    if (window.location.pathname !== routeTo) {
      router.replace(createClientRoute(route, params), routeTo);
    }
  }
}

module.exports = {
  createClientRoute,
  createServerRoute,
  replaceOrRedirect
};
