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

it("should get note by ID", () => {
  const note = MOCK_NOTES[0];
  db.query.mockImplementationOnce(() => Promise.resolve({ rows: [note] }));

  expect(Notes.getById(note.id)).resolves.toStrictEqual(snakeToCamel(note));
  expect(db.query).lastCalledWith("SELECT * FROM notes WHERE id = $1", [
    note.id
  ]);
});

it("should get return null if no note exists", () => {
  db.query.mockImplementationOnce(() => Promise.resolve({ rows: [] }));

  expect(Notes.getById(1)).resolves.toBe(null);
});

it("should get notes by notebook ID", () => {
  const notebookId = 1;
  const notes = MOCK_NOTES.filter(note => note.notebook_id === notebookId);
  db.query.mockImplementationOnce(() => Promise.resolve({ rows: notes }));

  expect(Notes.getByNotebookId(notebookId)).resolves.toStrictEqual(
    notes.map(snakeToCamel)
  );
  expect(db.query).lastCalledWith(
    "SELECT * FROM notes WHERE notebook_id = $1",
    [notebookId]
  );
});
