import { Note } from "./notes";
import Notebooks from "../stores/Notebooks";
import { NotFoundError } from "../errors";

jest.mock("../stores/Notes");
jest.mock("../stores/Notebooks");

describe("Note", () => {
  describe("notebook", () => {
    it("should get the parent notebook of the note", () => {
      const MOCK_NOTEBOOK = {
        id: 1,
        title: "Notebook title"
      };

      Notebooks.getById.mockImplementationOnce(() =>
        Promise.resolve(MOCK_NOTEBOOK)
      );

      expect(Note.notebook({ notebookId: 1 })).resolves.toBe(MOCK_NOTEBOOK);
    });

    it("should return null if the notebook does not exist", () => {
      Notebooks.getById.mockImplementationOnce(() =>
        Promise.reject(new NotFoundError())
      );

      expect(Note.notebook({ notebookId: 1 })).resolves.toBe(null);
    });
  });
});
