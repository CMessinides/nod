import Notes from "./Notes";
import db from "../db";
import { snakeToCamel } from "../db/transformers";
jest.mock("../db");

const MOCK_NOTES = [
  {
    id: 1,
    title: "Basic note 🚀",
    created_at: new Date(),
    modified_at: new Date(),
    notebook_id: 2
  },
  {
    id: 2,
    title: "Another note 🦁",
    created_at: new Date(),
    modified_at: new Date(),
    notebook_id: 1
  }
];

const MOCK_CONTENT = [
  {
    id: 2,
    note_id: 1,
    type: "task_list",
    prev_chunk_id: 1,
    name: "Chores",
    text: null
  },
  {
    id: 1,
    note_id: 1,
    type: "text_content",
    prev_chunk_id: null,
    name: null,
    text: "lorem ipsum"
  }
];

it("should get note by ID", async () => {
  expect.assertions(3);

  const noteInDB = MOCK_NOTES[0];
  db.query.mockClear();
  db.query
    .mockResolvedValueOnce({ rows: [noteInDB], rowCount: 1 })
    .mockResolvedValueOnce({
      rows: MOCK_CONTENT,
      rowCount: MOCK_CONTENT.length
    });

  const note = await Notes.getById(noteInDB.id);

  expect(note).toStrictEqual({
    ...snakeToCamel(noteInDB),
    content: [
      {
        id: 1,
        type: "text_content",
        prevChunkId: null,
        text: "lorem ipsum"
      },
      {
        id: 2,
        type: "task_list",
        prevChunkId: 1,
        name: "Chores"
      }
    ]
  });

  expect(db.query).nthCalledWith(1, "SELECT * FROM notes WHERE id = $1", [
    noteInDB.id
  ]);
  expect(db.query).nthCalledWith(
    2,
    "SELECT note_chunks.id, prev_chunk_id, type, name, text FROM note_chunks FULL JOIN note_text_content_chunks ON note_chunks.id = note_text_content_chunks.id FULL JOIN note_task_list_chunks ON note_chunks.id = note_task_list_chunks.id WHERE note_id = $1",
    [note.id]
  );
});

it("should get return null if no note exists", () => {
  db.query.mockResolvedValueOnce({ rows: [], rowCount: 0 });

  expect(Notes.getById(1)).resolves.toBe(null);
});

it("should get notes by notebook ID", () => {
  const notebookId = 1;
  const notes = MOCK_NOTES.filter(note => note.notebook_id === notebookId);
  db.query
    .mockResolvedValue({ rows: [], rowCount: 0 })
    .mockResolvedValueOnce({ rows: notes, rowCount: notes.length });

  expect(Notes.getByNotebookId(notebookId)).resolves.toStrictEqual(
    notes.map(note => ({
      ...snakeToCamel(note),
      content: []
    }))
  );
  expect(db.query).toHaveBeenCalledWith(
    "SELECT * FROM notes WHERE notebook_id = $1",
    [notebookId]
  );
});
