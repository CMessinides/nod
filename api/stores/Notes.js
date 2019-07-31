import db from "../db";
import { snakeToCamel } from "../db/transformers";
import { NotFoundError } from "../errors";
import { pipe } from "lodash/fp";
import { makeSluggable } from "../../lib/slugs";

const prepareNote = pipe(
  snakeToCamel,
  makeSluggable
);

module.exports = {
  async getById(id) {
    const { rows } = await db.query("SELECT * FROM notes WHERE id = $1", [id]);

    const note = rows[0];
    if (!note) {
      throw new NotFoundError("No note found with ID " + id);
    }

    return prepareNote(note);
  },
  async getByNotebookId(id) {
    const { rows } = await db.query(
      "SELECT * FROM notes WHERE notebook_id = $1",
      [id]
    );
    return rows.map(prepareNote);
  }
};
