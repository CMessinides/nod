import slugify from "slugify";

export interface Sluggable {
	id: number;
	title: string;
	slug: string;
}

// The slug is made of three parts:
// 1. a hyphenated, lowercase representation of the title/name/etc.
// 2. a "--" separator
// 3. a numeric ID
const SLUG_REGEX = /^([a-z\d-]+)--(\d+)$/;

export function isSlug(s: string): boolean {
	return SLUG_REGEX.test(s);
}

export function getIdFromSlug(slug: string): string {
	const matches = slug.match(SLUG_REGEX);
	return matches === null ? null : matches[2];
}

export function makeSluggable<S extends Sluggable>(instance: S): S {
	Object.defineProperty(instance, "slug", {
		get(): string {
			return slugify(this.title, { lower: true }) + "--" + this.id;
		}
	});

	return instance;
}
