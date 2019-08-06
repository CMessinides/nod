import { pick } from "./utils";

describe("pick", () => {
	const obj = {
		id: 1,
		name: "First Last",
		email: "name@example.com",
		permissions: ["file:edit", "file:create"]
	};

	it("should error if object is null", () => {
		expect(() => pick(null, [])).toThrow();
	});

	it("should accept a single key as a string", () => {
		expect(pick(obj, "id")).toStrictEqual({ id: 1 });
	});

	it("should accept multiple keys", () => {
		expect(pick(obj, "id", "name")).toStrictEqual({
			id: 1,
			name: "First Last"
		});
	});
});
