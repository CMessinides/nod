const db = require("../db");
const { snakeToCamel } = require("../db/transformers");

module.exports = {
  async all() {
    const { rows } = await db.query("SELECT * FROM notebooks");
    return rows.map(row => snakeToCamel(row));
  },
  async getById(id) {
    const { rows } = await db.query("SELECT * FROM notebooks WHERE id = $1", [
      id
    ]);
    return rows[0] ? snakeToCamel(rows[0]) : null;
  }
};
