exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
    INSERT INTO notebooks (title, description)
    VALUES
        ('Generic notebook', NULL),
        ('Notebook with description', 'This describes the notebook');
  `);
};

exports.down = pgm => {
  pgm.sql(`
    DELETE FROM notebooks;
  `);
};
