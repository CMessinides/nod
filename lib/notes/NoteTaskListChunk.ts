import { NoteChunkType, NoteTaskListModel } from "./interfaces";
import NoteContentChunk, { NoteChunkRecord } from "./NoteContentChunk";
import Task from "../tasks/Task";
import TaskList from "../tasks/TaskList";

export type NoteTaskListChunkRecord = Omit<NoteChunkRecord, "text"> & {
	type: NoteChunkType.TASK_LIST;
};
type NoteTaskListChunkParams = Omit<NoteTaskListModel, "tasks"> & {
	listId: number;
};

export default class NoteTaskListChunk extends NoteContentChunk
	implements NoteTaskListModel {
	id: number;
	type: NoteChunkType.TASK_LIST;
	name: string;
	private listId: number;

	static fromRecord({
		id,
		name,
		type,
		list_id
	}: NoteTaskListChunkRecord): NoteTaskListChunk {
		return new NoteTaskListChunk({
			id,
			name,
			type,
			listId: list_id
		});
	}

	constructor(params: NoteTaskListChunkParams) {
		super();
		Object.assign(this, params);
	}

	async tasks(): Promise<Task[]> {
		const list = await TaskList.findById(this.listId);

		if (list === null) return [];

		return list.tasks();
	}
}
