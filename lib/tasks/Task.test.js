import Task from "./Task";

// For mocking
import TaskList from "./TaskList";
import DB from "../DB";
import MockRecords from "./fixtures/TaskRecords";

jest.mock("../DB");
DB.query.mockResolvedValue({ rows: [], rowCount: 0 });

jest.mock("./TaskList");
TaskList.findById.mockResolvedValue(new TaskList());

describe("static methods", () => {
	describe("findById", () => {
		it("should return the task with the given ID", async () => {
			const record = MockRecords[0];
			const { id } = record;
			mockDBRows([record]);

			expect(Task.findById(id)).resolves.toMatchSnapshot();
		});

		it("should return null if the task does not exist", () => {
			// mock the database to return an empty array when queried for the task
			mockDBRows([]);

			expect(Task.findById(1)).resolves.toBe(null);
		});
	});

	describe("getAllInList", () => {
		it("should return the list's tasks in order", () => {
			const listId = 1;
			mockDBRows(MockRecords.filter(record => record.list_id === listId));

			expect(Task.getAllInList(listId)).resolves.toMatchSnapshot();
		});

		it("should return an empty array if the list does not exist", () => {
			// mock the database to return an empty array when queried for the list
			mockDBRows([]);

			expect(Task.getAllInList(1)).resolves.toHaveLength(0);
		});
	});
});

describe("instance methods", () => {
	describe("list", () => {
		it("should return the task's parent list", () => {
			const task = Task.fromRecord(MockRecords[0]);
			const list = new TaskList({
				id: task.listId
			});

			TaskList.findById.mockResolvedValueOnce(list);

			expect(task.list()).resolves.toBe(list);
		});
	});
});

function mockDBRows(rows) {
	DB.query.mockResolvedValueOnce({ rows, rowCount: rows.length });
}
