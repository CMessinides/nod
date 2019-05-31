const { gql } = require("apollo-server-express");

module.exports = gql`
  scalar Date

  type Notebook {
    id: ID!
    title: String!
    description: String
    created_at: Date!
  }

  type Query {
    notebooks: [Notebook]
    notebookById(id: ID!): Notebook
  }
`;
