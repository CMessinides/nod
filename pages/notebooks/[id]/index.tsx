import "isomorphic-fetch";
import React from "react";
import ApiClient from "../../../client";
import { ResponseError } from "../../../client/errors";
import ClientOnly from "../../../components/ClientOnly";
import Link from "next/link";
import { NextPage } from "next";
import Error from "next/error";
import { Notebook, ApiResource } from "../../../lib/types";

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
											href={"/notebooks/[id]/notes/[id]"}
											as={`/notebooks/${notebook.id}/notes/${note.id}`}
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

NotebookPage.getInitialProps = async function({ query, res }) {
	let { data, error } = await ApiClient.request<QueryData>({
		query: `
      query {
        notebook: notebookById(id: ${query.id}) {
          id
          title
          description
          createdAt
          notes {
            id
            title
            modifiedAt
          }
        }
      }
    `,
		res
	});

	if (!error && (data as QueryData).notebook === null) {
		res.statusCode = 404;
		error = new ResponseError("No notebook found with ID " + query.id, 404);
	}

	return { ...data, error };
};

export default NotebookPage;
