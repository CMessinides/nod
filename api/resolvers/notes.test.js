import { noteById, Note } from "./notes";
import Notes from "../stores/Notes";
import Notebooks from "../stores/Notebooks";
import MOCK_NOTES from "../stores/fixtures/notes";
import MOCK_NOTEBOOKS from "../stores/fixtures/notebooks";

jest.mock("../stores/Notes");
jest.mock("../stores/Notebooks");

describe("noteById", () => {
	it("should return the note with the given ID", () => {
		const id = 1;
		const note = MOCK_NOTES.find(note => note.id === id);
		Notes.getById.mockImplementationOnce(() => Promise.resolve(note));

		expect(noteById(null, { id })).resolves.toBe(note);
	});
});

describe("Note", () => {
	describe("notebook", () => {
		it("should get the parent notebook of the note", () => {
			const notebookId = 1;
			const notebook = MOCK_NOTEBOOKS.find(
				notebook => notebook.id === notebookId
			);

			Notebooks.getById.mockImplementationOnce(() => Promise.resolve(notebook));

			expect(Note.notebook({ notebookId })).resolves.toBe(notebook);
		});

		it("should return null if the notebook does not exist", () => {
			Notebooks.getById.mockImplementationOnce(() => Promise.resolve(null));

			expect(Note.notebook({ notebookId: 1 })).resolves.toBe(null);
		});
	});
});
