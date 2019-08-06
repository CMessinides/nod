exports.shorthands = undefined;

exports.up = pgm => {
	pgm.sql(`
    CREATE TABLE notebooks (
      id serial PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
};

exports.down = pgm => {
	pgm.sql(`
    DROP TABLE notebooks;
  `);
};
