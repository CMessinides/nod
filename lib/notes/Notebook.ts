import { NotebookModel } from "./interfaces";
import DB from "../DB";
import pipe from "lodash/fp/pipe";
import { makeSluggable } from "../slugs";
import Note from "./Note";

interface NotebookRecord {
	id: number;
	title: string;
	description: string;
	created_at: Date;
}

type NotebookParams = Omit<NotebookModel, "notes" | "slug">;

const prepareNotebook: (notebook: Notebook) => Notebook = pipe(makeSluggable);

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
