const db = require("../db");
const { snakeToCamel } = require("../db/transformers");
const { NotFoundError } = require("../errors");

module.exports = {
  async getById(id) {
    const { rows } = await db.query("SELECT * FROM notes WHERE id = $1", [id]);

    const note = rows[0];
    if (!note) {
      throw new NotFoundError("No note found with ID " + id);
    }

    return snakeToCamel(note);
  },
  async getByNotebookId(id) {
    const { rows } = await db.query(
      "SELECT * FROM notes WHERE notebook_id = $1",
      [id]
    );
    return rows.map(snakeToCamel);
  }
};
