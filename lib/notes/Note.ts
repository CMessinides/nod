import { NoteModel, NoteChunkType } from "./interfaces";
import DB from "../DB";
import { makeSluggable } from "../slugs";
import pipe from "lodash/fp/pipe";
import sortBy from "lodash/fp/sortBy";
import reverse from "lodash/fp/reverse";
import Notebook from "./Notebook";
import LinkedList from "../LinkedList";
import NoteTaskListChunk, {
	NoteTaskListChunkRecord
} from "./NoteTaskListChunk";
import NoteTextContentChunk, {
	NoteTextContentChunkRecord
} from "./NoteTextContentChunk";
import { NoteChunkRecord } from "./NoteContentChunk";

interface NoteRecord {
	id: number;
	title: string;
	created_at: Date;
	modified_at: Date;
	notebook_id: number;
}

type NoteParams = Omit<NoteModel, "notebook" | "content" | "slug"> & {
	notebookId: number;
};

const prepareNote: (note: Note) => Note = pipe(makeSluggable);
const sortByModifiedDate = pipe(
	sortBy<Note>("modifiedAt"),
	reverse
);

type NoteContentChunk = NoteTaskListChunk | NoteTextContentChunk;
function modelChunkByType(record: NoteChunkRecord): NoteContentChunk {
	switch (record.type) {
		case NoteChunkType.TASK_LIST:
			return NoteTaskListChunk.fromRecord(record as NoteTaskListChunkRecord);
		case NoteChunkType.TEXT_CONTENT:
			return NoteTextContentChunk.fromRecord(
				record as NoteTextContentChunkRecord
			);
		default:
			throw new Error("Unrecognized content chunk type: " + record.type);
	}
}

export default class Note implements NoteModel {
	id: number;
	title: string;
	slug: string;
	createdAt: Date;
	modifiedAt: Date;
	private notebookId: number;

	static async findById(id: number): Promise<Note> {
		const { rows, rowCount } = await DB.query(
			"SELECT * FROM notes WHERE id = $1 LIMIT 1",
			[id]
		);

		if (rowCount === 0) {
			return null;
		}

		return Note.fromRecord(rows[0] as NoteRecord);
	}

	static async getAllInNotebook(notebookId: number): Promise<Note[]> {
		const { rows }: { rows: NoteRecord[] } = await DB.query(
			"SELECT * FROM notes WHERE notebook_id = $1",
			[notebookId]
		);

		return sortByModifiedDate(rows.map(Note.fromRecord));
	}

	static fromRecord({
		id,
		title,
		created_at,
		modified_at,
		notebook_id
	}: NoteRecord): Note {
		return new Note({
			id,
			title,
			createdAt: created_at,
			modifiedAt: modified_at,
			notebookId: notebook_id
		});
	}

	constructor(params: NoteParams) {
		for (const key of Object.keys(params)) {
			this[key] = params[key];
		}

		prepareNote(this);
	}

	notebook(): Promise<Notebook> {
		return Notebook.findById(this.notebookId);
	}

	async content(): Promise<NoteContentChunk[]> {
		const { rows }: { rows: NoteChunkRecord[] } = await DB.query(
			"SELECT note_chunks.id, prev_chunk_id, type, name, list_id, text FROM note_chunks FULL JOIN note_text_content_chunks ON note_chunks.id = note_text_content_chunks.id FULL JOIN (SELECT note_task_list_chunks.id, list_id, name FROM note_task_list_chunks JOIN task_lists ON note_task_list_chunks.list_id = task_lists.id) AS full_note_task_list_chunks ON note_chunks.id = full_note_task_list_chunks.id WHERE note_id = $1",
			[this.id]
		);

		return Array.from(LinkedList(rows, "id", "prev_chunk_id")).map(
			modelChunkByType
		);
	}
}
