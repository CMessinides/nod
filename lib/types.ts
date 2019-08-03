export interface Task {
	id: number;
	name: string;
	createdAt: number;
	done: boolean;
	list: TaskList;
}

export enum NoteChunkType {
	TASK_LIST,
	TEXT_CONTENT
}

export interface NoteChunk {
	type: NoteChunkType;
	id: number;
	note: Note;
}

export interface TaskList extends NoteChunk {
	type: NoteChunkType.TASK_LIST;
	name: string;
	tasks: Task[];
}

export interface TextContent extends NoteChunk {
	type: NoteChunkType.TEXT_CONTENT;
	content: string;
}

export interface Note {
	id: number;
	title: string;
	slug: string;
	createdAt: number;
	modifiedAt: number;
	notebook: Notebook;
	body: NoteChunk[];
}

export interface Notebook {
	id: number;
	title: string;
	slug: string;
	description: string | null;
	createdAt: number;
	notes: Note[];
}

export interface ClientError extends Error {
	code?: string;
	status?: number;
}

export interface ApiError extends Error {
	extensions: {
		code?: string;
		exception?: {
			status: number;
		};
	} & Record<string, any>;
}

type ValidResource<T extends {}> = { error: null } & T;
type InvalidResource<T extends {}> = { error: ClientError } & Partial<T>;
export type ApiResource<T = {}> = ValidResource<T> | InvalidResource<T>;
