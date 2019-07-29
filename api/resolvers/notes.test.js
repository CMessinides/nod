import { Query, Note } from "./notes";
import Notes from "../stores/Notes";
import Notebooks from "../stores/Notebooks";
import { ErrorType } from "../../lib/errors";

jest.mock("../stores/Notes");
jest.mock("../stores/Notebooks");

describe("Query", () => {
  describe("noteById", () => {
    it("should throw a NotFoundError if no note exists for the given ID", async () => {
      expect.assertions(1);

      Notes.getById.mockImplementationOnce(() => Promise.resolve(null));

      let error;
      try {
        await Query.noteById(null, { id: 1 });
      } catch (e) {
        error = e;
      }

      expect(error.extensions.code).toBe(ErrorType.NOT_FOUND);
    });
  });
});

describe("Note", () => {
  describe("slug", () => {
    it.each([
      ["a-generic-note-title", "A generic note title"],
      ["an-all-caps-title", "AN ALL CAPS TITLE"],
      ["title-with-unicode-love", "Title With Unicode ♥"],
      ["title-with-emoji", "title with emoji 😎"]
    ])("should return %s when the note title is %s", (slug, title) => {
      expect(Note.slug({ title })).toStrictEqual(slug);
    });
  });

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
  });
});
