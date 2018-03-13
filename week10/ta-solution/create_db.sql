CREATE DATABASE familyhistory;
\c familyhistory;

CREATE TABLE person
(
	id SERIAL PRIMARY KEY NOT NULL,
	first VARCHAR(100) NOT NULL,
	last VARCHAR(100),
	birthdate date
);

INSERT INTO person(first, last, birthdate) VALUES
  ('Thomas', 'Burton', '1878-08-28'),
  ('Herbert', 'Burton', '1847-10-01'),
  ('Mary', 'Pass', '1849-08-06');

CREATE USER ta_user WITH PASSWORD 'ta_pass';
GRANT SELECT, INSERT, UPDATE ON person TO ta_user;
GRANT USAGE, SELECT ON SEQUENCE person_id_seq TO ta_user;
