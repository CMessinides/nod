import db from "../db";
import { snakeToCamel } from "../db/transformers";
import { pipe } from "lodash/fp";
import { makeSluggable } from "../../lib/slugs";

const prepareNote = pipe(
  snakeToCamel,
  makeSluggable
);

module.exports = {
  async getById(id) {
    const { rows } = await db.query("SELECT * FROM notes WHERE id = $1", [id]);
    return rows[0] ? prepareNote(rows[0]) : null;
  },
  async getByNotebookId(id) {
    const { rows } = await db.query(
      "SELECT * FROM notes WHERE notebook_id = $1",
      [id]
    );
    return rows.map(prepareNote);
  }
};
