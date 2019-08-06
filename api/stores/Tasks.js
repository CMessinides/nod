import db from "../db";
import { pipe } from "lodash/fp";
import { snakeToCamel } from "../db/transformers";
import LinkedList from "../../lib/LinkedList";

const prepareTask = pipe(snakeToCamel);

export async function getAllInList(listId) {
	const { rows } = await db.query("SELECT * FROM tasks WHERE list_id = $1", [
		listId
	]);

	const tasks = rows.map(prepareTask);
	return Array.from(LinkedList(tasks, "id", "prevTaskId"));
}
