import { Pool } from "pg";
import { connectionString } from "../config/db.config";
import { dev } from "../config/server.config";

const pool = new Pool({ connectionString, ssl: !dev });

export default {
	query: pool.query
};
