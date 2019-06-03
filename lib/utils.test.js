import { pick } from "./utils";

describe("pick", () => {
  const obj = {
    id: 1,
    name: "First Last",
    email: "name@example.com",
    permissions: ["file:edit", "file:create"]
  };

  it("should default to returning an empty object", () => {
    expect(pick()).toStrictEqual({});
  });

  it("should error if object is null", () => {
    expect(() => pick(null, [])).toThrow();
  });

  it("should accept a single key as a string", () => {
    expect(pick(obj, "id")).toStrictEqual({ id: 1 });
  });

  it("should accept multiple keys as an array", () => {
    expect(pick(obj, ["name", "permissions"])).toStrictEqual({
      name: "First Last",
      permissions: ["file:edit", "file:create"]
    });
  });

  it("should error if keys are not a string or array", () => {
    expect(() => pick(obj, true)).toThrow();
    expect(() => pick(obj, 2)).toThrow();
  });
});
