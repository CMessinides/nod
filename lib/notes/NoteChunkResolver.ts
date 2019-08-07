import { NoteChunkType, NoteContentChunkModel } from "./interfaces";

export default {
	__resolveType(chunk: NoteContentChunkModel): string {
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
