import db from "../db";
import { snakeToCamel } from "../db/transformers";
import { pipe } from "lodash/fp";
import { makeSluggable } from "../../lib/slugs";
import { pick } from "../../lib/utils";
import LinkedList from "../../lib/LinkedList";
import { NoteChunkType } from "../../lib/types";

const prepareNote = pipe(
	snakeToCamel,
	makeSluggable
);

const SHARED_CHUNK_KEYS = ["id", "type", "prevChunkId"];
function formatChunkByType(chunk) {
	switch (chunk.type) {
		case NoteChunkType.TASK_LIST:
			return pick(chunk, "name", "listId", ...SHARED_CHUNK_KEYS);
		case NoteChunkType.TEXT_CONTENT:
			return pick(chunk, "text", ...SHARED_CHUNK_KEYS);
		default:
			throw new Error("Unrecognized content chunk type: " + chunk.type);
	}
}

const prepareContentChunk = pipe(
	snakeToCamel,
	formatChunkByType
);

async function getContent(note) {
	const { rows } = await db.query(
		"SELECT note_chunks.id, prev_chunk_id, type, name, list_id, text FROM note_chunks FULL JOIN note_text_content_chunks ON note_chunks.id = note_text_content_chunks.id FULL JOIN (SELECT note_task_list_chunks.id, list_id, name FROM note_task_list_chunks JOIN task_lists ON note_task_list_chunks.list_id = task_lists.id) AS full_note_task_list_chunks ON note_chunks.id = full_note_task_list_chunks.id WHERE note_id = $1",
		[note.id]
	);

	note.content = Array.from(
		LinkedList(rows.map(prepareContentChunk), "id", "prevChunkId")
	);
	return note;
}

module.exports = {
	async getById(id) {
		const { rows, rowCount } = await db.query(
			"SELECT * FROM notes WHERE id = $1",
			[id]
		);

		if (rowCount === 0) return null;

		const note = rows[0];
		await getContent(note);
		return prepareNote(note);
	},
	async getByNotebookId(id) {
		const { rows: notes } = await db.query(
			"SELECT * FROM notes WHERE notebook_id = $1",
			[id]
		);

		for (const note of notes) {
			await getContent(note);
		}

		return notes.map(prepareNote);
	}
};
