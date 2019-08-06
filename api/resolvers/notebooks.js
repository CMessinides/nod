import Notebooks from "../stores/Notebooks";
import Notes from "../stores/Notes";

export function notebooks() {
	return Notebooks.all();
}

export function notebookById(parent, args) {
	return Notebooks.getById(args.id);
}

export const Notebook = {
	notes({ id }) {
		return Notes.getByNotebookId(id);
	}
};
