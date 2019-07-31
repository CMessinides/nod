import db from "../db";
import { snakeToCamel } from "../db/transformers";
import { NotFoundError } from "../errors";
import { pipe } from "lodash/fp";
import { makeSluggable } from "../../lib/slugs";

const prepareNotebook = pipe(
  snakeToCamel,
  makeSluggable
);

export default {
  async all() {
    const { rows } = await db.query("SELECT * FROM notebooks");
    return rows.map(prepareNotebook);
  },
  async getById(id) {
    const { rows } = await db.query("SELECT * FROM notebooks WHERE id = $1", [
      id
    ]);

    const notebook = rows[0];

    if (!notebook) {
      throw new NotFoundError("No notebook found with ID " + id);
    }

    return prepareNotebook(notebook);
  }
};
