import NotebookPage from "../pages/notebooks/[slug]/index";
import ApiClient from "../client/Client";
import { ResponseError } from "../client/errors";
jest.mock("../client/Client");

const notebook = {
	id: 1,
	title: "Notebook",
	slug: "notebook--1",
	description: "A simple collection of notes",
	createdAt: new Date("2019-01-02").valueOf(),
	notes: [
		{
			id: 1,
			title: "Note 1",
			slug: "note-1--1",
			createdAt: new Date("2019-01-02").valueOf(),
			modifiedAt: new Date("2019-02-05").valueOf()
		},
		{
			id: 2,
			title: "Note 2",
			slug: "note-2--2",
			createdAt: new Date("2019-01-12").valueOf(),
			modifiedAt: new Date("2019-01-13").valueOf()
		}
	]
};

describe("getInitialProps", () => {
	it("should return the notebook for the given ID", () => {
		ApiClient.request.mockImplementationOnce(({ query }) =>
			Promise.resolve({
				data: {
					// Ensure that NotebookPage properly parsed the ID
					// from the slug and included it in the GraphQL query
					notebook: query.includes("(id: 1)") ? notebook : null
				},
				error: null
			})
		);
		expect(
			NotebookPage.getInitialProps({ query: { slug: "notebook--1" }, res: {} })
		).resolves.toStrictEqual({ notebook, error: null });
	});

	it("should return a Not Found error if the API returns a null notebook", async () => {
		expect.assertions(3);
		ApiClient.request.mockImplementationOnce(() =>
			Promise.resolve({ data: { notebook: null }, error: null })
		);

		const res = {};
		const { error } = await NotebookPage.getInitialProps({
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
			const { error } = await NotebookPage.getInitialProps({
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
