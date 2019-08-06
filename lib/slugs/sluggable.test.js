import sluggable from "./sluggable";

it("should decorate the class with a slug field", () => {
	@sluggable
	class TestClass {
		constructor() {
			this.id = 1;
			this.title = "Foo bar baz";
		}
	}

	expect(new TestClass().slug).toBe("foo-bar-baz--1");
});
