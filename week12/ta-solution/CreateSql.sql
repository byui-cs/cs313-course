# Create a database and connect to it
CREATE DATABASE books_ta;
\c books_ta

# Create a table for the books and authors
CREATE TABLE author (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE book (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(100) NOT NULL,
  author_id INT REFERENCES author(id)
);

# Some test data:
INSERT INTO author(name) VALUES ('C.S. Lewis'), ('Mark Twain'), ('Clayton Christensen');

INSERT INTO book(title, author_id) VALUES
  ('The Great Divorce',
  	(SELECT id FROM author WHERE name = 'C.S. Lewis')
  );

INSERT INTO book(title, author_id) VALUES
  ('Mere Christianity',
  	(SELECT id FROM author WHERE name = 'C.S. Lewis')
  );

INSERT INTO book(title, author_id) VALUES
  ('Huckleberry Finn',
  	(SELECT id FROM author WHERE name = 'Mark Twain')
  );

INSERT INTO book(title, author_id) VALUES
  ('The Adventures of Tom Sawyer',
  	(SELECT id FROM author WHERE name = 'Mark Twain')
  );

INSERT INTO book(title, author_id) VALUES
  ('How Will You Measure Your Life?',
  	(SELECT id FROM author WHERE name = 'Clayton Christensen')
  );

INSERT INTO book(title, author_id) VALUES
  ('The Power of Everyday Missionaries',
  	(SELECT id FROM author WHERE name = 'Clayton Christensen')
  );


# Create a user that can access this table
CREATE USER ta_user WITH PASSWORD 'ta_pass';
GRANT SELECT, INSERT, UPDATE ON book TO ta_user;
GRANT SELECT, INSERT, UPDATE ON author TO ta_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO ta_user;

