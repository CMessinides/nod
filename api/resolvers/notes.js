import Notes from "../stores/Notes";
import Notebooks from "../stores/Notebooks";
import * as Tasks from "../stores/Tasks";
import { NoteChunkType } from "../../lib/types";

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
			case NoteChunkType.TEXT_CONTENT:
				return "NoteText";
			case NoteChunkType.TASK_LIST:
				return "NoteTaskList";
			default:
				return null;
		}
	}
};

export const NoteTaskList = {
	tasks({ id }) {
		return Tasks.getAllInList(id);
	}
};
