import { Notebook } from "./notebooks";
import Notes from "../stores/Notes";

jest.mock("../stores/Notebooks");
jest.mock("../stores/Notes");

describe("Notebook", () => {
  describe("notes", () => {
    it("should get the notes belonging to the notebook", () => {
      const MOCK_NOTES = [
        {
          id: 1,
          title: "Note 1"
        },
        {
          id: 2,
          title: "Note 2"
        }
      ];

      Notes.getByNotebookId.mockImplementationOnce(() =>
        Promise.resolve(MOCK_NOTES)
      );

      expect(Notebook.notes({ id: 1 })).resolves.toBe(MOCK_NOTES);
    });
  });
});
