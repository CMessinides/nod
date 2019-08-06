/* eslint-disable @typescript-eslint/camelcase */

import { getAllInList } from "./Tasks";
import db from "../db";
import { snakeToCamel } from "../db/transformers";

jest.mock("../db");

const MOCK_TASKS = [
	{
		id: 1,
		name: "Wash car",
		done: true,
		created_at: new Date(),
		list_id: 1,
		prev_task_id: null
	},
	{
		id: 2,
		name: "Read Wuthering Heights",
		done: false,
		created_at: new Date(),
		list_id: 1,
		prev_task_id: 3
	},
	{
		id: 3,
		name: "Call Ruth",
		done: true,
		created_at: new Date(),
		list_id: 1,
		prev_task_id: 1
	},
	{
		id: 4,
		name: "Remember to hydrate",
		done: false,
		created_at: new Date(),
		list_id: 2,
		prev_task_id: 5
	},
	{
		id: 5,
		name: "Dig for dinosaur bones",
		done: false,
		created_at: new Date(),
		list_id: 2,
		prev_task_id: null
	}
];

describe("getAllInList", () => {
	it("should get all tasks in the given list", () => {
		const listId = 1;
		const tasksInList = MOCK_TASKS.filter(task => task.list_id === listId);
		db.query.mockResolvedValueOnce({ rows: tasksInList });

		expect(getAllInList(listId)).resolves.toStrictEqual(
			[MOCK_TASKS[0], MOCK_TASKS[2], MOCK_TASKS[1]].map(snakeToCamel)
		);
		expect(db.query).lastCalledWith("SELECT * FROM tasks WHERE list_id = $1", [
			listId
		]);
	});
});
