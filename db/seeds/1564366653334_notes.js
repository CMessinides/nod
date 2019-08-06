exports.shorthands = undefined;

exports.up = pgm => {
	pgm.sql(`
			INSERT INTO notes (title, notebook_id)
			VALUES
					('Generic note', 1),
					('Another generic note', 1),
					('A note in another notebook', 2);
	`);
};

exports.down = pgm => {
	pgm.sql(`
		DELETE FROM notes;
	`);
};
