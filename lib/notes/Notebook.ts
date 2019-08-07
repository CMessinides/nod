import { NotebookModel } from "./interfaces";
import DB from "../DB";
import pipe from "lodash/fp/pipe";
import { makeSluggable } from "../slugs";
import Note from "./Note";
import sortBy from "lodash/fp/sortBy";
import reverse from "lodash/fp/reverse";

interface NotebookRecord {
	id: number;
	title: string;
	description: string;
	created_at: Date;
}

type NotebookParams = Omit<NotebookModel, "notes" | "slug">;

const prepareNotebook: (notebook: Notebook) => Notebook = pipe(makeSluggable);
const sortByCreatedDate = pipe(
	sortBy<Notebook>("createdAt"),
	reverse
);

export default class Notebook implements NotebookModel {
	id: number;
	title: string;
	slug: string;
	description: string;
	createdAt: Date;

	static async findById(id: number): Promise<Notebook> {
		const { rows, rowCount } = await DB.query(
			"SELECT * FROM notebooks WHERE id = $1 LIMIT 1",
			[id]
		);

		if (rowCount === 0) {
			return null;
		}

		return Notebook.fromRecord(rows[0] as NotebookRecord);
	}

	static async all(): Promise<Notebook[]> {
		const { rows }: { rows: NotebookRecord[] } = await DB.query(
			"SELECT * FROM notebooks;"
		);

		return sortByCreatedDate(rows.map(Notebook.fromRecord));
	}

	static fromRecord({ created_at, ...props }: NotebookRecord): Notebook {
		return new Notebook({ ...props, createdAt: created_at });
	}

	constructor(params: NotebookParams) {
		Object.assign(this, params);
		prepareNotebook(this);
	}

	notes(): Promise<Note[]> {
		return Note.getAllInNotebook(this.id);
	}
}
