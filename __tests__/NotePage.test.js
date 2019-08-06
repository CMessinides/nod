import NotePage from "../pages/notebooks/[slug]/notes/[slug]";
import ApiClient from "../client/Client";
import { ResponseError } from "../client/errors";
jest.mock("../client/Client");

const note = {
	id: 1,
	title: "Note 1",
	slug: "note-1--1",
	createdAt: new Date("2019-01-02").valueOf(),
	modifiedAt: new Date("2019-02-05").valueOf(),
	notebook: {
		id: 1,
		title: "Notebook",
		slug: "notebook--1"
	}
};

describe("getInitialProps", () => {
	it("should return the note for the given ID", () => {
		ApiClient.request.mockImplementationOnce(({ query }) =>
			Promise.resolve({
				data: {
					// Ensure that NotePage properly parsed the ID
					// from the slug and included it in the GraphQL query
					note: query.includes("(id: 1)") ? note : null
				},
				error: null
			})
		);

		expect(
			NotePage.getInitialProps({ query: { slug: "note-1--1" }, res: {} })
		).resolves.toStrictEqual({ note, error: null });
	});

	it("should return a Not Found error if the API returns a null note", async () => {
		expect.assertions(3);
		ApiClient.request.mockImplementationOnce(() =>
			Promise.resolve({ data: { note: null }, error: null })
		);

		const res = {};
		const { error } = await NotePage.getInitialProps({
			query: { slug: "does-not-exist--00002" },
			res
		});

		expectNotFoundError(error, res);
	});

	it("should return a Not Found error if the slug is unparseable", async () => {
		expect.assertions(9);

		const badSlugs = ["1", "note-title", "note-title-1"];
		for (const slug of badSlugs) {
			const res = {};
			const { error } = await NotePage.getInitialProps({
				query: { slug },
				res
			});

			expectNotFoundError(error, res);
		}
	});
});

function expectNotFoundError(error, res) {
	expect(res.statusCode).toBe(404);
	expect(error).toBeInstanceOf(ResponseError);
	expect(error.status).toBe(404);
}
