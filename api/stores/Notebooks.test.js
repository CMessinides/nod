import Notebooks from "./Notebooks";
import db from "../db";
jest.mock("../db");

const MOCK_TASKS = [
  {
    id: 1,
    title: "Basic notebook",
    description: "This is a good old basic notebook.",
    created_at: new Date()
  },
  {
    id: 2,
    title: "Notebook without description",
    created_at: new Date()
  }
];

it("should get all notebooks", () => {
  db.query.mockImplementationOnce(() => Promise.resolve({ rows: MOCK_TASKS }));

  const notebooks = new Notebooks(db);
  expect(notebooks.all()).resolves.toBe(MOCK_TASKS);
  expect(db.query).lastCalledWith("SELECT * FROM notebooks");
});

it("should get notebook by ID", () => {
  const task = MOCK_TASKS[0];
  db.query.mockImplementationOnce(() => Promise.resolve({ rows: [task] }));

  const notebooks = new Notebooks(db);
  expect(notebooks.getById(task.id)).resolves.toBe(task);
  expect(db.query).lastCalledWith("SELECT * FROM notebooks WHERE id = $1", [
    task.id
  ]);
});
