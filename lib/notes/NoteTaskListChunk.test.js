import NoteTaskListChunk from "./NoteTaskListChunk";

jest.mock("../tasks/TaskList");
import TaskList from "../tasks/TaskList";
jest.mock("../tasks/Task");
import Task from "../tasks/Task";
import MockChunkRecords from "./fixtures/NoteContentChunkRecords";
import { NoteChunkType } from "../types";

describe("instance methods", () => {
	describe("tasks", () => {
		it("should return the tasks belonging to the list", () => {
			const chunk = NoteTaskListChunk.fromRecord(
				MockChunkRecords.find(record => (record.type = NoteChunkType.TASK_LIST))
			);
			const list = new TaskList({ id: chunk.listId });
			const tasks = [
				new Task({ id: 1, listId: chunk.listId }),
				new Task({ id: 2, listId: chunk.listId })
			];

			list.tasks.mockResolvedValueOnce(tasks);
			TaskList.findById.mockResolvedValueOnce(list);

			expect(chunk.tasks()).resolves.toBe(tasks);
		});
	});
});
