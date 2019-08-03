import db from "../db";
import { snakeToCamel } from "../db/transformers";
import { pipe } from "lodash/fp";
import { makeSluggable } from "../../lib/slugs";
import { pick } from "../../lib/utils";
import { sortLinkedList } from "../../lib/linkedList";

const prepareNote = pipe(
  snakeToCamel,
  makeSluggable
);

const prepareContentChunk = pipe(
  snakeToCamel,
  formatChunkByType
);

const SHARED_CHUNK_KEYS = ["id", "type", "prevChunkId"];
function formatChunkByType(chunk) {
  switch (chunk.type) {
    case "task_list":
      return pick(chunk, "name", ...SHARED_CHUNK_KEYS);
    case "text_content":
      return pick(chunk, "text", ...SHARED_CHUNK_KEYS);
    default:
      throw new Error("Unrecognized content chunk type: " + chunk.type);
  }
}

async function getContent(note) {
  const { rows } = await db.query(
    "SELECT note_chunks.id, prev_chunk_id, type, name, text FROM note_chunks FULL JOIN note_text_content_chunks ON note_chunks.id = note_text_content_chunks.id FULL JOIN note_task_list_chunks ON note_chunks.id = note_task_list_chunks.id WHERE note_id = $1",
    [note.id]
  );

  note.content = sortLinkedList(rows.map(prepareContentChunk), {
    prevIdKey: "prevChunkId"
  });
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
