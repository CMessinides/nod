import Notebooks from "../stores/Notebooks";
import Notes from "../stores/Notes";
import sluggable from "./sluggable";

export function notebooks() {
  return Notebooks.all();
}

export function notebookById(parent, args) {
  return Notebooks.getById(args.id);
}

export const Notebook = sluggable({
  notes({ id }) {
    return Notes.getByNotebookId(id);
  }
});
