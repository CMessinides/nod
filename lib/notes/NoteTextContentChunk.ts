import NoteContentChunk, { NoteChunkRecord } from "./NoteContentChunk";
import { NoteChunkType } from "../types";
import { NoteTextContentModel } from "./interfaces";

export type NoteTextContentChunkRecord = Omit<
	NoteChunkRecord,
	"list_id" | "name"
> & {
	type: NoteChunkType.TEXT_CONTENT;
};
type NoteTextContentChunkParams = NoteTextContentModel;

export default class NoteTextContentChunk extends NoteContentChunk
	implements NoteTextContentModel {
	id: number;
	type: NoteChunkType.TEXT_CONTENT;
	text: string;

	static fromRecord({
		id,
		text,
		type
	}: NoteTextContentChunkRecord): NoteTextContentChunk {
		return new NoteTextContentChunk({ id, text, type });
	}

	constructor(params: NoteTextContentChunkParams) {
		super();
		Object.assign(this, params);
	}
}
