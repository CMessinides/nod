exports.shorthands = undefined;

exports.up = pgm => {
	pgm.sql(`
		CREATE TABLE notes (
			id serial PRIMARY KEY,
			title VARCHAR(255) NOT NULL,
			created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
			modified_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
			notebook_id INTEGER REFERENCES notebooks(id) ON DELETE CASCADE
		);
	`);
};

exports.down = pgm => {
	pgm.sql(`
		DROP TABLE notes;
	`);
};
