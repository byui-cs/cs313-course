# First connect to the DB created in the previous script
\c scripture_ta

# Create a table for our topics
CREATE TABLE topic (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(40) NOT NULL
  );

# Insert data into the topic table
INSERT INTO topic (name) VALUES ('Faith');
INSERT INTO topic (name) VALUES ('Sacrifice');
INSERT INTO topic (name) VALUES ('Charity');

# Now create a cross-reference table to link scriptures and topics
# We have to have a separate table for this, because it is a many-to-many
# relationship.

# Some people like to put an additional "id" on a table like this, but it is
# not strictly necessary.
CREATE TABLE scripture_topic (
  scriptureId int NOT NULL REFERENCES scripture(id),
  topicId int NOT NULL REFERENCES topic(id)
  );

# Finally, ensure that our user that was created last time
# has access to these tables:
GRANT SELECT, INSERT, UPDATE ON topic TO ta_user;
GRANT SELECT, INSERT, UPDATE ON scripture_topic TO ta_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO ta_user;

