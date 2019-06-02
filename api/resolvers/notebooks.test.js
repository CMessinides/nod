import { Notebook } from "./notebooks";

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
