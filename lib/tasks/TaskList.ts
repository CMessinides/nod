import { TaskListModel } from "./interfaces";
import DB from "../DB";
import Task from "./Task";

interface TaskListRecord {
	id: number;
	name: string;
}

type TaskListParams = Omit<TaskListModel, "tasks">;

export default class TaskList implements TaskListModel {
	id: number;
	name: string;

	static async findById(id: number): Promise<TaskList> {
		const { rows, rowCount } = await DB.query(
			"SELECT * FROM task_lists WHERE id = $1 LIMIT 1",
			[id]
		);

		if (rowCount === 0) {
			return null;
		}

		return TaskList.fromRecord(rows[0] as TaskListRecord);
	}

	static fromRecord(record: TaskListRecord): TaskList {
		return new TaskList(record);
	}

	constructor(params: TaskListParams) {
		for (const key of Object.keys(params)) {
			this[key] = params[key];
		}
	}

	tasks(): Promise<Task[]> {
		return Task.getAllInList(this.id);
	}
}
