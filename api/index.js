const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

function createApiServer({ dev = false, root = "/" } = {}) {
  const path =
    "/" +
    require("url")
      .parse(root)
      .pathname.split("/")
      .slice(2)
      .join("/");
  const app = express();

  const server = new ApolloServer({ typeDefs, resolvers });
  server.applyMiddleware({ app, path, debug: dev });
  return app;
}

module.exports = createApiServer;
