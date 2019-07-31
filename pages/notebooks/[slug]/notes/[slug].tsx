import React from "react";
import ApiClient from "../../../../client";
import ClientOnly from "../../../../components/ClientOnly";
import Link from "next/link";
import Error from "next/error";
import { NextPage } from "next";
import { ApiResource, Note } from "../../../../lib/types";
import { ResponseError } from "../../../../client/errors";
import { isSlug, getIdFromSlug } from "../../../../lib/slugs";
import { redirectIfNecessary } from "../../../../lib/routes";

interface QueryData {
	note: Note;
}
type Props = ApiResource<QueryData>;

const NotePage: NextPage<Props> = ({ note, error }) => {
	if (error !== null) {
		return <Error statusCode={error.status || 500} />;
	} else {
		return (
			<div>
				<h1>{note.title}</h1>
				<dl>
					<dt>Notebook</dt>
					<dd>
						<Link
							href="/notebooks/[slug]"
							as={`/notebooks/${note.notebook.slug}`}
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
		);
	}
};

const notFoundError = new ResponseError(
	"That note doesn't appear to exist",
	404
);
NotePage.getInitialProps = async function({ query, req, res }) {
	if (!isSlug(query.slug as string)) {
		if (res) res.statusCode = 404;
		return { error: notFoundError };
	}

	const id = getIdFromSlug(query.slug as string);
	let { data, error } = await ApiClient.request<QueryData>({
		query: `
			query {
				note: noteById(id: ${id}) {
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

	const { note } = data as QueryData;
	if (note === null) {
		if (res) res.statusCode = 404;
		return { error: notFoundError };
	}

	redirectIfNecessary({
		url: `/notebooks/${note.notebook.slug}/notes/${note.slug}`,
		req,
		res
	});

	return { note, error };
};

export default NotePage;
