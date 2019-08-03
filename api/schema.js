import { gql } from "apollo-server-micro";

export default gql`
  scalar Date

  type Notebook {
    id: ID!
    title: String!
    slug: String!
    description: String
    createdAt: Date!
    notes: [Note]
  }

  enum NoteChunkType {
    TEXT_CONTENT
    TASK_LIST
  }

  interface NoteChunk {
    id: ID!
    type: NoteChunkType!
  }

  type NoteText implements NoteChunk {
    id: ID!
    type: NoteChunkType!
    text: String!
  }

  type NoteTaskList implements NoteChunk {
    id: ID!
    type: NoteChunkType!
    name: String!
  }

  type Note {
    id: ID!
    title: String!
    slug: String!
    createdAt: Date!
    modifiedAt: Date!
    notebook: Notebook!
    content: [NoteChunk]!
  }

  type Query {
    notebooks: [Notebook]
    notebookById(id: ID!): Notebook
    noteById(id: ID!): Note
  }
`;
