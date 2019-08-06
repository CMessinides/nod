// The slug is made of three parts:
// 1. a hyphenated, lowercase representation of the title/name/etc.
// 2. a "--" separator
// 3. a numeric ID
const SLUG_REGEX = /^([a-z\d-]+)--(\d+)$/;

export function isSlug(s: string) {
	return SLUG_REGEX.test(s);
}

export function getIdFromSlug(slug: string) {
	const matches = slug.match(SLUG_REGEX);
	return matches === null ? null : matches[2];
}
