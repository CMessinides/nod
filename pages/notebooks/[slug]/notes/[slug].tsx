import React from "react";
import ApiClient from "../../../../client";
import ClientOnly from "../../../../components/ClientOnly";
import Link from "next/link";
import Error from "next/error";
import { NextPage } from "next";
import {
	ApiResource,
	Note,
	NoteChunk,
	TaskList,
	TextContent,
	NoteChunkType
} from "../../../../lib/types";
import { ResponseError } from "../../../../client/errors";
import { isSlug, getIdFromSlug } from "../../../../lib/slugs";
import { redirectIfNecessary } from "../../../../lib/routes";

interface QueryData {
	note: Note;
}
type Props = ApiResource<QueryData>;

const Tasks: React.FC<TaskList> = ({ name, tasks }) => {
	return (
		<>
			<h2>{name}</h2>
			<ul>
				{tasks.map(task => (
					<li key={task.id}>
						<input
							id={`__task-${task.id}`}
							type="checkbox"
							defaultChecked={task.done}
						/>
						<label htmlFor={`__task-${task.id}`}>{task.name}</label>
					</li>
				))}
			</ul>
		</>
	);
};

const Text: React.FC<TextContent> = ({ text }) => {
	return <p>{text}</p>;
};

const ContentChunk: React.FC<NoteChunk> = chunk => {
	switch (chunk.type) {
		case NoteChunkType.TASK_LIST:
			return <Tasks {...(chunk as TaskList)} />;
		case NoteChunkType.TEXT_CONTENT:
			return <Text {...(chunk as TextContent)} />;
		default:
			return null;
	}
};

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
				<div>
					{note.content.map(chunk => (
						<ContentChunk key={chunk.id} {...chunk} />
					))}
				</div>
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
	const { data, error } = await ApiClient.request<QueryData>({
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
					content {
						id
						type
						...on NoteTaskList {
							name
							tasks {
								id
								name
								done
							}
						}
						...on NoteText {
							text
						}
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
