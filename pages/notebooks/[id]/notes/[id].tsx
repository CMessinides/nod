import React from "react";
import ApiClient from "../../../../client";
import ClientOnly from "../../../../components/ClientOnly";
import Link from "next/link";
import Error from "next/error";
import { NextPage } from "next";
import { ApiResource, Note } from "../../../../lib/types";

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
						<Link href="/notebooks/[id]" as={`/notebooks/${note.notebook.id}`}>
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

NotePage.getInitialProps = async function({ query, res }) {
	let { data, error } = await ApiClient.request<QueryData>({
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

export default NotePage;
