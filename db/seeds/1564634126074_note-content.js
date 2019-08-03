exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
		BEGIN TRANSACTION;
			WITH chunk AS (
				INSERT INTO note_chunks (type, note_id)
				VALUES ('task_list', 1)
				RETURNING id
			)
			INSERT INTO note_task_list_chunks (id, name)
			VALUES ((SELECT id FROM chunk), 'Chores');

			WITH chunk AS (
				INSERT INTO note_chunks (type, note_id, prev_chunk_id)
				VALUES ('text_content', 1, 1)
				RETURNING id
			)
			INSERT INTO note_text_content_chunks (id, text)
			VALUES ((SELECT id FROM chunk), 'This is a piece of text content.');

			WITH chunk AS (
				INSERT INTO note_chunks (type, note_id)
				VALUES ('text_content', 2)
				RETURNING id
			)
			INSERT INTO note_text_content_chunks (id, text)
			VALUES ((SELECT id FROM chunk), 'This is another piece of text content.');

			WITH chunk AS (
				INSERT INTO note_chunks (type, note_id, prev_chunk_id)
				VALUES ('task_list', 2, 3)
				RETURNING id
			)
			INSERT INTO note_task_list_chunks (id, name)
			VALUES ((SELECT id FROM chunk), 'Reading List');

			WITH chunk AS (
				INSERT INTO note_chunks (type, note_id, prev_chunk_id)
				VALUES ('text_content', 2, 4)
				RETURNING id
			)
			INSERT INTO note_text_content_chunks (id, text)
			VALUES ((SELECT id FROM chunk), 'One more time: some text content.');

			COMMIT;

		INSERT INTO tasks (name, done, list_id, prev_task_id)
		VALUES ('Take out the trash', FALSE, 1, NULL),
					 ('Walk the dog (2x)', FALSE, 1, 1),
					 ('Clean up garage', TRUE, 1, 2),
					 ('A Song of Ice and Fire', TRUE, 4, NULL),
					 ('Infinite Jest', TRUE, 4, 4),
					 ('Wuthering Heights', FALSE, 4, 5),
					 ('Something by Margaret Atwood ??', FALSE, 4, 6);
	`);
};

exports.down = pgm => {
  pgm.sql(`
		DELETE FROM note_chunks;
		ALTER SEQUENCE note_chunks_id_seq RESTART WITH 1;
	`);
};
