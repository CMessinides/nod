import Notes from "../stores/Notes";
import Notebooks from "../stores/Notebooks";

export function noteById(parent, args) {
  return Notes.getById(args.id);
}

export const Note = {
  notebook({ notebookId }) {
    return Notebooks.getById(notebookId);
  }
};

export const NoteChunk = {
  __resolveType(chunk) {
    switch (chunk.type) {
      case "text_content":
        return "NoteText";
      case "task_list":
        return "NoteTaskList";
      default:
        return null;
    }
  }
};

export const NoteChunkType = {
  TASK_LIST: "task_list",
  TEXT_CONTENT: "text_content"
};
