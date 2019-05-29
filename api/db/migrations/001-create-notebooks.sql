CREATE TABLE IF NOT EXISTS notebooks (
    id serial PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL
);
