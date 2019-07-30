const db = require("../db");
const { snakeToCamel } = require("../db/transformers");
const { NotFoundError } = require("../errors");

module.exports = {
  async all() {
    const { rows } = await db.query("SELECT * FROM notebooks");
    return rows.map(row => snakeToCamel(row));
  },
  async getById(id) {
    const { rows } = await db.query("SELECT * FROM notebooks WHERE id = $1", [
      id
    ]);

    const notebook = rows[0];

    if (!notebook) {
      throw new NotFoundError("No notebook found with ID " + id);
    }

    return snakeToCamel(notebook);
  }
};
