export interface TaskListModel {
	id: number;
	name: string;
	tasks(): Promise<TaskModel[]>;
}

export interface TaskModel {
	id: number;
	name: string;
	done: boolean;
	createdAt: Date;
	list(): Promise<TaskListModel>;
}
