import Notebooks from "./Notebooks";
import db from "../db";
import { snakeToCamel } from "../db/transformers";
jest.mock("../db");

const MOCK_NOTEBOOKS = [
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

describe("all", () => {
  it("should get all notebooks", () => {
    db.query.mockImplementationOnce(() =>
      Promise.resolve({ rows: MOCK_NOTEBOOKS })
    );

    expect(Notebooks.all()).resolves.toStrictEqual(
      MOCK_NOTEBOOKS.map(snakeToCamel)
    );
    expect(db.query).lastCalledWith("SELECT * FROM notebooks");
  });
});

describe("getById", () => {
  it("should get notebook by ID", () => {
    const notebook = MOCK_NOTEBOOKS[0];
    db.query.mockImplementationOnce(() =>
      Promise.resolve({ rows: [notebook] })
    );

    expect(Notebooks.getById(notebook.id)).resolves.toStrictEqual(
      snakeToCamel(notebook)
    );
    expect(db.query).lastCalledWith("SELECT * FROM notebooks WHERE id = $1", [
      notebook.id
    ]);
  });

  it("should return null if no notebook exists", () => {
    db.query.mockImplementationOnce(() => Promise.resolve({ rows: [] }));

    expect(Notebooks.getById(1)).resolves.toBe(null);
  });
});
