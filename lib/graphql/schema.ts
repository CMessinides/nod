import { gql } from "apollo-server-micro";
import Date from "../date/Date.graphql";
import Task from "../tasks/Task.graphql";
import TaskList from "../tasks/TaskList.graphql";
import Note from "../notes/Note.graphql";
import NoteChunk from "../notes/NoteChunk.graphql";
import NoteText from "../notes/NoteText.graphql";
import NoteTaskList from "../notes/NoteTaskList.graphql";
import Notebook from "../notes/Notebook.graphql";
import Query from "./Query.graphql";

export default gql`
	${Date}

	${Task}
	${TaskList}

	${Note}
	${NoteChunk}
	${NoteText}
	${NoteTaskList}
	${Notebook}

	${Query}
`;
