module.exports = class Notebooks {
  constructor(db) {
    this.db = db;
  }

  async all() {
    const { rows } = await this.db.query("SELECT * FROM notebooks");
    return rows;
  }

  async getById(id) {
    const { rows } = await this.db.query(
      "SELECT * FROM notebooks WHERE id = $1",
      [id]
    );
    return rows[0] ? rows[0] : null;
  }
};
