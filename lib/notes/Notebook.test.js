import Notebook from "./Notebook";

jest.mock("../DB");
import DB from "../DB";
jest.mock("./Note");
import Note from "./Note";
import MockRecords from "./fixtures/NotebookRecords";

describe("static methods", () => {
	describe("findById", () => {
		it("should return the notebook with the given ID", () => {
			const record = MockRecords[0];
			const { id } = record;
			DB.__mockRows([record]);

			expect(Notebook.findById(id)).resolves.toMatchSnapshot();
		});
	});
});

describe("instance methods", () => {
	describe("notes", () => {
		it("should return the notes in the notebook", () => {
			const notebook = Notebook.fromRecord(MockRecords[0]);
			const notes = [
				new Note({ id: 1, notebookId: notebook.id }),
				new Note({ id: 2, notebookId: notebook.id })
			];
			Note.getAllInNotebook.mockResolvedValueOnce(notes);

			expect(notebook.notes()).resolves.toBe(notes);
		});
	});
});
