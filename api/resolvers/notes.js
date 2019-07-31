import Notes from "../stores/Notes";
import Notebooks from "../stores/Notebooks";
import nullIfNotFound from "./nullIfNotFound";

export function noteById(parent, args) {
  return Notes.getById(args.id);
}

export const Note = {
  notebook({ notebookId }) {
    return nullIfNotFound(Notebooks.getById(notebookId));
  }
};
