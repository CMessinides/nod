import { Date } from "./date";
import { notebooks, notebookById, Notebook } from "./notebooks";
import { noteById, Note, NoteChunk, NoteChunkType } from "./notes";

export default {
  Query: {
    notebooks,
    notebookById,
    noteById
  },
  Date,
  Notebook,
  Note,
  NoteChunk,
  NoteChunkType
};
