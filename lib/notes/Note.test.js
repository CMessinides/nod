import Note from "./Note";

// For mocking
jest.mock("../DB");
import DB from "../DB";
jest.mock("./Notebook");
import Notebook from "./Notebook";
import MockRecords from "./fixtures/NoteRecords";
import MockChunkRecords from "./fixtures/NoteContentChunkRecords";

describe("static methods", () => {
	describe("findById", () => {
		it("should return the note with the given ID", () => {
			const record = MockRecords[0];
			const { id } = record;
			DB.__mockRows([record]);

			expect(Note.findById(id)).resolves.toMatchSnapshot();
		});

		it("should return null if the note does not exist", () => {
			expect(Note.findById(2)).resolves.toBe(null);
		});
	});

	describe("getAllInNotebook", () => {
		it("should return the notes in the given notebook sorted by modified date", () => {
			const notebookId = 1;
			const records = MockRecords.filter(
				record => record.notebook_id === notebookId
			);
			DB.__mockRows(records);

			expect(Note.getAllInNotebook(notebookId)).resolves.toMatchSnapshot();
		});

		it("should return an empty array if no notes exist", () => {
			expect(Note.getAllInNotebook(2)).resolves.toHaveLength(0);
		});
	});
});

describe("instance methods", () => {
	describe("notebook", () => {
		it("should return the note's parent notebook", () => {
			const note = Note.fromRecord(MockRecords[0]);
			const notebook = new Notebook({ id: note.notebookId });
			Notebook.findById.mockResolvedValueOnce(notebook);

			expect(note.notebook()).resolves.toBe(notebook);
		});
	});

	describe("content", () => {
		it("should return the note's content chunks in order", () => {
			const note = Note.fromRecord(MockRecords[0]);
			const chunkRecords = MockChunkRecords.filter(
				record => record.note_id === note.id
			);
			DB.__mockRows(chunkRecords);

			expect(note.content()).resolves.toMatchSnapshot();
		});
	});
});
