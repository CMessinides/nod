import { Query, Notebook } from "./notebooks";
import Notebooks from "../stores/Notebooks";
import { ErrorType } from "../../lib/errors";

jest.mock("../stores/Notebooks");

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
});
