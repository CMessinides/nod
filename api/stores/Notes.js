const db = require("../db");
const { snakeToCamel } = require("../db/transformers");

module.exports = {
  async getById(id) {
    const { rows } = await db.query("SELECT * FROM notes WHERE id = $1", [id]);
    return rows[0] ? snakeToCamel(rows[0]) : null;
  },
  async getByNotebookId(id) {
    const { rows } = await db.query(
      "SELECT * FROM notes WHERE notebook_id = $1",
      [id]
    );
    return rows.map(snakeToCamel);
  }
};
