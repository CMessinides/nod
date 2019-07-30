import { pick, decorate } from "./utils";

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

describe("decorate", () => {
  const fooDecorator = obj => ((obj.foo = "foo"), obj);
  const barDecorator = obj => ((obj.bar = "bar"), obj);

  it("should error if object is null or undefined", () => {
    expect(() => decorate(null, fooDecorator)).toThrow();
    expect(() => decorate(undefined, fooDecorator)).toThrow();
  });

  it("should error if one or more decorators is not a function", () => {
    expect(() => decorate({}, true)).toThrow();
    expect(() => decorate({}, [])).toThrow();
    expect(() => decorate({}, "string")).toThrow();
  });

  it("should apply all decorators to the object", () => {
    let obj = {};
    obj = decorate(obj, fooDecorator, barDecorator);

    expect(obj.foo).toStrictEqual("foo");
    expect(obj.bar).toStrictEqual("bar");
  });
});
