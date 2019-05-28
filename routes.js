const routes = {
  notebook: "/notebooks/:id"
};

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

module.exports = {
  routes,
  createClientRoute,
  createServerRoute
};
