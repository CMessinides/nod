const { Pool } = require("pg");
const { connectionString } = require("../../config/db.config");
const { dev } = require("../../config/server.config");

const pool = new Pool({ connectionString, ssl: !dev });

module.exports = {
	query: (text, params) => pool.query(text, params)
};
