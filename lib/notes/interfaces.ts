import { Sluggable } from "../slugs";
import { TaskListModel } from "../tasks/interfaces";

export enum NoteChunkType {
	TEXT_CONTENT = "TEXT_CONTENT",
	TASK_LIST = "TASK_LIST"
}

export interface NoteContentChunkModel {
	id: number;
	type: NoteChunkType;
}

export interface NoteTextContentModel extends NoteContentChunkModel {
	type: NoteChunkType.TEXT_CONTENT;
	text: string;
}
export function chunkIsTextContent(
	chunk: NoteContentChunkModel
): chunk is NoteTextContentModel {
	return chunk.type === NoteChunkType.TEXT_CONTENT;
}

export interface NoteTaskListModel
	extends NoteContentChunkModel,
		TaskListModel {
	type: NoteChunkType.TASK_LIST;
}

export function chunkIsTaskList(
	chunk: NoteContentChunkModel
): chunk is NoteTaskListModel {
	return chunk.type === NoteChunkType.TASK_LIST;
}

export interface NoteModel extends Sluggable {
	createdAt: Date;
	modifiedAt: Date;
	content(): Promise<NoteContentChunkModel[]>;
	notebook(): Promise<NotebookModel>;
}

export interface NotebookModel extends Sluggable {
	description: string;
	createdAt: Date;
	notes(): Promise<NoteModel[]>;
}
