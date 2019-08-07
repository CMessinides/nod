import { NoteContentChunkModel } from "./interfaces";
import { NoteChunkType } from "../types";

export interface NoteChunkRecord {
	id: number;
	type: NoteChunkType;
	note_id: number;
	prev_chunk_id: number;
	// Text content fields
	text: string;
	// Task list fields
	name: string;
	list_id: number;
}

export default abstract class NoteContentChunk
	implements NoteContentChunkModel {
	id: number;
	type: NoteChunkType;
}
