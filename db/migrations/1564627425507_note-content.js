exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
		CREATE TYPE note_chunk_type AS ENUM ('TASK_LIST', 'TEXT_CONTENT');
		CREATE TABLE note_chunks (
			id SERIAL PRIMARY KEY,
			type note_chunk_type NOT NULL,
			note_id INTEGER REFERENCES notes(id) ON DELETE CASCADE,
			prev_chunk_id INTEGER UNIQUE REFERENCES note_chunks(id) ON DELETE SET NULL
		);

		CREATE TABLE note_task_list_chunks (
			id INTEGER PRIMARY KEY REFERENCES note_chunks(id) ON DELETE CASCADE,
			name VARCHAR(255) NOT NULL
		);

		CREATE TABLE tasks (
			id SERIAL PRIMARY KEY,
			name VARCHAR(255) NOT NULL,
			done BOOLEAN NOT NULL DEFAULT FALSE,
			created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
			list_id INTEGER REFERENCES note_task_list_chunks(id) ON DELETE CASCADE,
			prev_task_id INTEGER UNIQUE REFERENCES tasks(id) ON DELETE SET NULL
		);

		CREATE TABLE note_text_content_chunks (
			id INTEGER PRIMARY KEY REFERENCES note_chunks(id) ON DELETE CASCADE,
			text TEXT
		);
	`);
};

exports.down = pgm => {
  pgm.sql(`
		DROP TABLE note_text_content_chunks;
		DROP TABLE tasks;
		DROP TABLE note_task_list_chunks;
		DROP TABLE note_chunks;
		DROP TYPE note_chunk_type;
	`);
};
