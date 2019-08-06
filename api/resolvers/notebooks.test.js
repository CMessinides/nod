import { notebooks, notebookById, Notebook } from "./notebooks";
import Notes from "../stores/Notes";
import Notebooks from "../stores/Notebooks";
import MOCK_NOTES from "../stores/fixtures/notes";
import MOCK_NOTEBOOKS from "../stores/fixtures/notebooks";

jest.mock("../stores/Notebooks");
jest.mock("../stores/Notes");

describe("notebooks", () => {
	it("should return all notebooks", () => {
		Notebooks.all.mockImplementationOnce(() => Promise.resolve(MOCK_NOTEBOOKS));

		expect(notebooks()).resolves.toBe(MOCK_NOTEBOOKS);
	});
});

describe("notebookById", () => {
	it("should return the notebook with the given ID", () => {
		const id = 1;
		const notebook = MOCK_NOTEBOOKS.find(notebook => notebook.id === id);
		Notebooks.getById.mockImplementationOnce(() => Promise.resolve(notebook));

		expect(notebookById(null, { id })).resolves.toBe(notebook);
	});
});

describe("Notebook", () => {
	describe("notes", () => {
		it("should get the notes belonging to the notebook", () => {
			const notebookId = 1;
			const notes = MOCK_NOTES.filter(note => note.notebookId === notebookId);
			Notes.getByNotebookId.mockImplementationOnce(() =>
				Promise.resolve(notes)
			);

			expect(Notebook.notes({ id: notebookId })).resolves.toBe(notes);
		});
	});
});
