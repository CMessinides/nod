import React from "react";
import { NextPage } from "next";
import { Notebook, ApiResource } from "../lib/types";
import Error from "next/error";
import Link from "next/link";
import ApiClient from "../client/Client";

type QueryData = { notebooks: Notebook[] };
type Props = ApiResource<QueryData>;

const Home: NextPage<Props> = ({ notebooks, error }) => {
	if (error) {
		return <Error statusCode={error.status || 500}></Error>;
	} else {
		return (
			<div>
				<h1>All notebooks</h1>
				{notebooks.length && (
					<ul>
						{notebooks
							.sort(
								(notebookA, notebookB) =>
									notebookA.createdAt - notebookB.createdAt
							)
							.map(notebook => (
								<li key={notebook.id}>
									<article>
										<h2>
											<Link
												href="/notebooks/[slug]"
												as={`/notebooks/${notebook.slug}`}
											>
												<a>{notebook.title}</a>
											</Link>
										</h2>
										{notebook.description && <p>{notebook.description}</p>}
									</article>
								</li>
							))}
					</ul>
				)}
			</div>
		);
	}
};

Home.getInitialProps = async ({ query, res }) => {
	const { data, error } = await ApiClient.request<QueryData>({
		query: `
			query {
				notebooks {
					id
					title
					slug
					description
					createdAt
				}
			}
		`,
		res
	});

	return { ...data, error };
};

export default Home;
