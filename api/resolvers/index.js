import { Date } from "./date";
import { notebooks, notebookById, Notebook } from "./notebooks";
import { noteById, Note, NoteChunk, NoteTaskList } from "./notes";

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
  NoteTaskList
};
