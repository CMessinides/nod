import TaskList from "./TaskList";

// For mocking
import DB from "../DB";
import Task from "./Task";
import MockRecords from "./fixtures/TaskListRecords";

jest.mock("../DB");
DB.query.mockResolvedValue({ rows: [], rowCount: 0 });

jest.mock("./Task");
Task.findById.mockResolvedValue(new Task());

describe("static methods", () => {
	describe("findById", () => {
		it("should return the list with the given ID", () => {
			const record = MockRecords[0];
			const { id } = record;

			mockDBRows([record]);

			expect(TaskList.findById(id)).resolves.toMatchSnapshot();
		});

		it("should return null when no list is found", () => {
			mockDBRows([]);

			expect(TaskList.findById(1)).resolves.toBe(null);
		});
	});
});

describe("instance methods", () => {
	describe("tasks", () => {
		it("should return the list's child tasks", () => {
			const taskList = TaskList.fromRecord(MockRecords[0]);
			const tasks = [
				new Task({ id: 1, listId: taskList.id }),
				new Task({ id: 2, listId: taskList.id })
			];

			Task.getAllInList.mockResolvedValue(tasks);

			expect(taskList.tasks()).resolves.toBe(tasks);
		});
	});
});

function mockDBRows(rows) {
	DB.query.mockResolvedValueOnce({ rows, rowCount: rows.length });
}
