import { isSlug, getIdFromSlug } from "./utils";

const BAD_SLUGS = ["1", "id:4", "just-a-title", "foo-bar-1", "ADD--2"];

const GOOD_SLUGS = ["foo--1", "foo-bar-baz--213"];

describe("isSlug", () => {
	it("should return true if the given string is a valid slug", () => {
		for (const slug of GOOD_SLUGS) {
			expect(isSlug(slug)).toBe(true);
		}

		for (const slug of BAD_SLUGS) {
			expect(isSlug(slug)).toBe(false);
		}
	});
});

describe("getIdFromSlug", () => {
	it("should extract the ID from valid slugs", () => {
		expect(getIdFromSlug(GOOD_SLUGS[0])).toBe("1");
		expect(getIdFromSlug(GOOD_SLUGS[1])).toBe("213");
	});

	it("should return null if the slug is invalid", () => {
		for (const slug of BAD_SLUGS) {
			expect(getIdFromSlug(slug)).toBe(null);
		}
	});
});
