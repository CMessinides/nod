import React from "react";
import PropTypes from "prop-types";
import ApiClient from "../../../../client";
import ClientOnly from "../../../../components/ClientOnly";
import CanError from "../../../../components/CanError";
import Link from "next/link";

function Note({ note, error }) {
	return (
		<CanError error={error}>
			{() => (
				<div>
					<h1>{note.title}</h1>
					<dl>
						<dt>Notebook</dt>
						<dd>
							<Link
								href="/notebooks/[id]"
								as={`/notebooks/${note.notebook.id}`}
							>
								<a>{note.notebook.title}</a>
							</Link>
						</dd>
						<dt>Last Modified At</dt>
						<dd>
							<ClientOnly>
								{new Date(note.modifiedAt).toLocaleString()}
							</ClientOnly>
						</dd>
					</dl>
				</div>
			)}
		</CanError>
	);
}

Note.getInitialProps = async function({ query, res }) {
	let { data, error } = await ApiClient.request({
		query: `
			query {
				note: noteById(id: ${query.id}) {
					id
					title
					slug
					modifiedAt
					notebook {
						id
						title
						slug
					}
				}
			}
		`,
		res
	});

	return { ...data, error };
};

Note.propTypes = {
	note: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		slug: PropTypes.string.isRequired,
		modifiedAt: PropTypes.number.isRequired,
		notebook: PropTypes.shape({
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			slug: PropTypes.string.isRequired
		})
	}),
	error: PropTypes.shape({
		code: PropTypes.string.isRequired
	})
};

export default Note;
