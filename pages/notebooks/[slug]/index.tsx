import "isomorphic-fetch";
import React from "react";
import ApiClient from "../../../client";
import { ResponseError } from "../../../client/errors";
import ClientOnly from "../../../components/ClientOnly";
import Link from "next/link";
import { NextPage } from "next";
import Error from "next/error";
import { Notebook, ApiResource } from "../../../lib/types";
import { isSlug, getIdFromSlug } from "../../../lib/slugs";
import { redirectIfNecessary } from "../../../lib/routes";

interface QueryData {
	notebook: Notebook;
}
type Props = ApiResource<QueryData>;

const NotebookPage: NextPage<Props> = ({ error, notebook }) => {
	if (error !== null) {
		return <Error statusCode={error.status || 500}></Error>;
	} else {
		return (
			<div>
				<h1>{notebook.title}</h1>
				{notebook.description && <p>{notebook.description}</p>}
				<dl>
					<dt>Created At</dt>
					<dd>
						<time>
							<ClientOnly>
								{new Date(notebook.createdAt).toLocaleDateString()}
							</ClientOnly>
						</time>
					</dd>
				</dl>
				<ul>
					{notebook.notes
						.sort((noteA, noteB) => noteA.modifiedAt - noteB.modifiedAt)
						.map(note => (
							<li key={note.id}>
								<article>
									<h2>
										<Link
											href={"/notebooks/[slug]/notes/[slug]"}
											as={`/notebooks/${notebook.slug}/notes/${note.slug}`}
										>
											<a>{note.title}</a>
										</Link>
									</h2>
									<dl>
										<dt>Last Modified At</dt>
										<dd>
											<time>
												<ClientOnly>
													{new Date(note.modifiedAt).toLocaleString()}
												</ClientOnly>
											</time>
										</dd>
									</dl>
								</article>
							</li>
						))}
				</ul>
			</div>
		);
	}
};

const notFoundError = new ResponseError(
	"That notebook doesn't appear to exist.",
	404
);
NotebookPage.getInitialProps = async function({ query, req, res }) {
	if (!isSlug(query.slug as string)) {
		if (res) res.statusCode = 404;
		return { error: notFoundError };
	}

	const id = getIdFromSlug(query.slug as string);
	const { data, error } = await ApiClient.request<QueryData>({
		query: `
      query {
        notebook: notebookById(id: ${id}) {
					id
					slug
          title
          description
          createdAt
          notes {
						id
						slug
            title
            modifiedAt
          }
        }
      }
    `,
		res
	});

	const { notebook } = data as QueryData;
	if (notebook === null) {
		if (res) res.statusCode = 404;
		return { error: notFoundError };
	}

	redirectIfNecessary({
		url: `/notebooks/${notebook.slug}`,
		req,
		res
	});

	return { notebook, error };
};

export default NotebookPage;
