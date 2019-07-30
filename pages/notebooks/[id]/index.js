import "isomorphic-fetch";
import React from "react";
import PropTypes from "prop-types";
import ApiClient from "../../../client";
import ClientOnly from "../../../components/ClientOnly";
import CanError from "../../../components/CanError";
import Link from "next/link";

function Notebook({ notebook, error }) {
	return (
		<CanError error={error}>
			{() => (
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
			)}
		</CanError>
	);
}

Notebook.getInitialProps = async function({ query, res }) {
	let { data, error } = await ApiClient.request({
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

	return { ...data, error };
};

Notebook.propTypes = {
	notebook: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string,
		createdAt: PropTypes.number,
		notes: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string.isRequired,
				title: PropTypes.string.isRequired,
				modifiedAt: PropTypes.number.isRequired
			})
		)
	}),
	error: PropTypes.shape({
		code: PropTypes.string.isRequired
	})
};

export default Notebook;
