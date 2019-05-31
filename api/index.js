const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const Notebooks = require("./stores/Notebooks");

function createApiServer({ dev = false, root = "/" } = {}) {
  const db = require("./db");
  const path =
    "/" +
    require("url")
      .parse(root)
      .pathname.split("/")
      .slice(2)
      .join("/");
  const app = express();

  const context = () => {
    return {
      Notebooks: new Notebooks(db)
    };
  };

  const server = new ApolloServer({ typeDefs, resolvers, context });
  server.applyMiddleware({ app, path, debug: dev });
  return app;
}

module.exports = createApiServer;
