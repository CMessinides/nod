export interface Note {
	id: number;
	title: string;
	createdAt: number;
	modifiedAt: number;
	notebook: Notebook;
}

export interface Notebook {
	id: number;
	title: string;
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
