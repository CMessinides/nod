import { Query, Notebook } from "./notebooks";
import Notebooks from "../stores/Notebooks";
import Notes from "../stores/Notes";
import { ErrorType } from "../../lib/errors";

jest.mock("../stores/Notebooks");
jest.mock("../stores/Notes");

describe("Query", () => {
  describe("notebookById", () => {
    it("should throw a NotFoundError if no notebook exists for the given ID", async () => {
      expect.assertions(1);

      Notebooks.getById.mockImplementationOnce(() => Promise.resolve(null));

      let error;
      try {
        await Query.notebookById(null, { id: 1 });
      } catch (e) {
        error = e;
      }

      expect(error.extensions.code).toBe(ErrorType.NOT_FOUND);
    });
  });
});

describe("Notebook", () => {
  describe("slug", () => {
    it.each([
      ["a-generic-notebook-title", "A generic notebook title"],
      ["an-all-caps-title", "AN ALL CAPS TITLE"],
      ["title-with-unicode-love", "Title With Unicode ♥"],
      ["title-with-emoji", "title with emoji 😎"]
    ])("should return %s when the notebook title is %s", (slug, title) => {
      expect(Notebook.slug({ title })).toStrictEqual(slug);
    });
  });

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
