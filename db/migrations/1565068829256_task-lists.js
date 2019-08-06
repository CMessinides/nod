exports.shorthands = undefined;

exports.up = pgm => {
	pgm.sql(`
		BEGIN;

		-- create a new table for task lists, including a temporary reference to the old note chunks
		CREATE TABLE task_lists (
			id SERIAL PRIMARY KEY,
			name VARCHAR(255) NOT NULL,
			_old_chunk_id INTEGER UNIQUE REFERENCES note_task_list_chunks(id) ON DELETE CASCADE
		);

		-- copy all the old chunk data into the new task lists table		
		INSERT INTO task_lists (name, _old_chunk_id) SELECT name, id FROM note_task_list_chunks;
		
		-- reference the child task list in the parent note chunk
		ALTER TABLE note_task_list_chunks
			ADD COLUMN list_id INTEGER UNIQUE REFERENCES task_lists(id) ON DELETE RESTRICT;
		
		-- add a column in tasks under a temporary name to add references to the new task list
		ALTER TABLE tasks
			ADD COLUMN _new_list_id INTEGER REFERENCES task_lists(id) ON DELETE CASCADE;
		
		-- update the note chunks to reference the new task lists
		UPDATE
			note_task_list_chunks
		SET
			list_id = task_lists.id
		FROM
			task_lists
		WHERE
			note_task_list_chunks.id = task_lists._old_chunk_id;
		
		-- update the tasks to reference the new task lists
		UPDATE
			tasks
		SET
			_new_list_id = task_lists.id
		FROM
			task_lists
		WHERE
			tasks.list_id = task_lists._old_chunk_id;
		
		-- remove duplicate name data from the note chunks
		ALTER TABLE note_task_list_chunks DROP COLUMN name;
		
		-- remove temporary reference to note chunks in task lists
		ALTER TABLE task_lists DROP COLUMN _old_chunk_id;
		
		-- remove the old reference to note chunks in favor of the new reference to task lists in tasks
		ALTER TABLE tasks DROP COLUMN list_id;
		ALTER TABLE tasks RENAME COLUMN _new_list_id TO list_id;

		COMMIT;
	`);
};

exports.down = pgm => {
	pgm.sql(`
		BEGIN;

		-- replace the reference to tasks lists in tasks with a reference to note chunks
		ALTER TABLE tasks RENAME COLUMN list_id TO _old_list_id;
		ALTER TABLE tasks ADD COLUMN list_id INTEGER REFERENCES note_task_list_chunks(id) ON DELETE CASCADE;
		
		-- update the tasks to point to the note chunks
		UPDATE
			tasks
		SET
			list_id = note_task_list_chunks.id
		FROM
			note_task_list_chunks
		WHERE
			tasks._old_list_id = note_task_list_chunks.list_id;
		
		-- remove the reference to task lists in tasks
		ALTER TABLE tasks DROP COLUMN _old_list_id;
		
		-- prepare to copy name data into note chunks
		ALTER TABLE note_task_list_chunks ADD COLUMN name VARCHAR(255);
		
		-- update note chunks with names from task lists
		UPDATE
			note_task_list_chunks
		SET
			name = task_lists.name
		FROM
			task_lists
		WHERE
			note_task_list_chunks.list_id = task_lists.id;
		
		-- with name data copied, make name column in note chunks not null
		ALTER TABLE note_task_list_chunks ALTER COLUMN name SET NOT NULL;

		-- remove the reference to task lists in note chunks
		ALTER TABLE note_task_list_chunks DROP COLUMN list_id;
		
		-- drop the task lists table
		DROP TABLE task_lists;

		COMMIT;
	`);
};
