import DB from "../DB";
import { TaskModel } from "./interfaces";
import TaskList from "./TaskList";
import LinkedList from "../LinkedList";

interface TaskRecord {
	id: number;
	name: string;
	done: boolean;
	created_at: Date;
	list_id: number;
	prev_task_id: number;
}

type TaskParams = Omit<TaskModel, "list"> & {
	listId: number;
};

export default class Task implements TaskModel {
	id: number;
	name: string;
	done: boolean;
	createdAt: Date;
	private listId: number;

	static async findById(id: number): Promise<Task> {
		const { rows, rowCount } = await DB.query(
			"SELECT * FROM tasks WHERE id = $1 LIMIT 1",
			[id]
		);

		if (rowCount === 0) {
			return null;
		}

		return Task.fromRecord(rows[0] as TaskRecord);
	}

	static async getAllInList(listId: number): Promise<Task[]> {
		const { rows: records }: { rows: TaskRecord[] } = await DB.query(
			"SELECT * FROM tasks WHERE list_id = $1",
			[listId]
		);

		return Array.from(LinkedList(records, "id", "prev_task_id")).map(
			Task.fromRecord
		);
	}

	static fromRecord({ id, name, done, created_at, list_id }: TaskRecord): Task {
		return new Task({
			id,
			name,
			done,
			createdAt: created_at,
			listId: list_id
		});
	}

	constructor(params: TaskParams) {
		for (const key of Object.keys(params)) {
			this[key] = params[key];
		}
	}

	list(): Promise<TaskList> {
		return TaskList.findById(this.listId);
	}
}
