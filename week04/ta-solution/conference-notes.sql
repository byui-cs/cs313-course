# First Create the database
CREATE DATABASE conference;

# Connect to the database, so that our tables, etc., will be there
\c conference

# When you run these commands at Heroku, you won't need (or be able to) create
# your own separate database first. It will already be created and you will
# be connected to it.


# A few helpful commands you might want during the process:
# \dt - Lists the tables
# \d+ public.user - Shows the details of the user table
# DROP TABLE public.user - Removes the user table completely so we can re-create it
# \q - Quit the application and go back to the regular command prompt

CREATE TABLE public.user
(
	id SERIAL NOT NULL PRIMARY KEY,
	username VARCHAR(100) NOT NULL UNIQUE,
	password VARCHAR(100) NOT NULL,
	display_name VARCHAR(100) NOT NULL
);

# Notice that we used "serial" for the datatype of the user table, which
# makes it an integer that will automatically increment the value of each
# item that is inserted.

# Also, notice that we made all of these columns NOT NULL, because they are
# not optional.

# Finally, notice that we made username unique, even though it is not the
# primary key, because we don't want two users with the same username.

CREATE TABLE public.speaker
(
	id SERIAL NOT NULL PRIMARY KEY,
	name VARCHAR(100) NOT NULL
);

CREATE TABLE public.conference
(
	id SERIAL NOT NULL PRIMARY KEY,
	year SMALLINT NOT NULL,
	is_spring BOOLEAN NOT NULL
);

# We could potentially store a date for the conference, or even two integers
# for year and month. But in this case, because we know there are only two
# conferences (Spring and Fall), we can restrict the data type to a boolean.
# Now, it is impossible to put bad data in, such as month "2", which would
# not correspond to a valid conference.

CREATE TABLE public.note
(
	id SERIAL NOT NULL PRIMARY KEY,
	user_id INT NOT NULL REFERENCES public.user(id),
	speaker_id INT NOT NULL REFERENCES public.speaker(id),
	conference_id INT NOT NULL REFERENCES public.conference(id),
	note_text TEXT NOT NULL
);

# Notice that we are setting up lots of foreign key constraints here. By
# listing that these columns reference the foreign keys of the other tables,
# we enforce that the user_id MUST match a valid id from the user table. This
# prevents invalid data from being entered, and also keeps us from accidentally
# deleting a user later that has notes in the database. If we wanted to delete
# the user, we would need to delete their notes first.

