const { gql } = require("apollo-server-express");

module.exports = gql`
  scalar Date

  type Notebook {
    id: ID!
    title: String!
    slug: String!
    description: String
    createdAt: Date!
    notes: [Note]
  }

  type Note {
    id: ID!
    title: String!
    slug: String!
    createdAt: Date!
    modifiedAt: Date!
    notebook: Notebook!
  }

  type Query {
    notebooks: [Notebook]
    notebookById(id: ID!): Notebook
    noteById(id: ID!): Note
  }
`;
