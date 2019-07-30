import Notebooks from "../stores/Notebooks";
import Notes from "../stores/Notes";
import sluggable from "./sluggable";
import { decorate } from "../../lib/utils";

export function notebooks() {
  return Notebooks.all();
}

export function notebookById(parent, args) {
  return Notebooks.getById(args.id);
}

export const Notebook = decorate(
  {
    notes({ id }) {
      return Notes.getByNotebookId(id);
    }
  },
  sluggable
);
