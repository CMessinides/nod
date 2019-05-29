const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "world"
  }
};

function createApiServer({ dev }) {
  const app = express();

  const server = new ApolloServer({ typeDefs, resolvers });
  server.applyMiddleware({ app, path: "/", debug: dev });
  return app;
}

module.exports = createApiServer;
