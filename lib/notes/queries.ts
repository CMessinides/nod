import Note from "./Note";
import Notebook from "./Notebook";

export function noteById(parent, { id }: { id: number }): Promise<Note> {
	return Note.findById(id);
}

export function notebookById(
	parent,
	{ id }: { id: number }
): Promise<Notebook> {
	return Notebook.findById(id);
}

export function notebooks(): Promise<Notebook[]> {
	return Notebook.all();
}
