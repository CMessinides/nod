import db from "../db";
import { snakeToCamel } from "../db/transformers";
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

    return rows[0] ? prepareNotebook(rows[0]) : null;
  }
};
