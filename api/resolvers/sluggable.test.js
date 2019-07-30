import sluggable from "./sluggable";

it("should decorate the provided type with a slug method", () => {
  expect(typeof sluggable({}).slug).toBe("function");
});

describe("slug", () => {
  const Type = sluggable({});

  it.each([
    ["a-generic-notebook-title", "A generic notebook title"],
    ["an-all-caps-title", "AN ALL CAPS TITLE"],
    ["title-with-unicode-love", "Title With Unicode ♥"],
    ["title-with-emoji", "title with emoji 😎"]
  ])("should return %s when the notebook title is %s", (slug, title) => {
    expect(Type.slug({ title })).toStrictEqual(slug);
  });
});
