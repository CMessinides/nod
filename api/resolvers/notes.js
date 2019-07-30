import Notes from "../stores/Notes";
import Notebooks from "../stores/Notebooks";
import sluggable from "./sluggable";
import nullIfNotFound from "./nullIfNotFound";
import { decorate } from "../../lib/utils";

export function noteById(parent, args) {
  return Notes.getById(args.id);
}

export const Note = decorate(
  {
    notebook({ notebookId }) {
      return nullIfNotFound(Notebooks.getById(notebookId));
    }
  },
  sluggable
);
