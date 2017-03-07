var express = require('express');
var app = express();

var pg = require("pg"); // This is the postgres database connection module.
const connectionString = "postgres://ta_user:ta_pass@localhost:5432/familyhistory";

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/getPerson', function(request, response) {
	getPerson(request, response);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function getPerson(request, response) {
	// First get the person's id
	var id = request.query.id;

	// TODO: It would be nice to check here for a valid id before continuing on...

	// use a helper function to query the DB, and provide a callback for when it's done
	getPersonFromDb(id, function(error, result) {
		// This is the callback function that will be called when the DB is done.
		// The job here is just to send it back.

		// Make sure we got a row with the person, then prepare JSON to send back
		if (error || result == null || result.length != 1) {
			response.status(500).json({success: false, data: error});
		} else {
			var person = result[0];
			response.status(200).json(result[0]);
		}
	});
}

function getPersonFromDb(id, callback) {
	console.log("Getting person from DB with id: " + id);

	pg.connect(connectionString, function(err, client, done) {
		if (err) {
			done();
			console.log("Error connecting to DB: ")
			console.log(err);
			callback(err, null);
		}

		var sql = "SELECT id, first, last, birthdate FROM person WHERE id = $1::int";
		var params = [id];

		var query = client.query(sql, params, function(err, result) {
			// we are now done getting the data from the DB
			done();

			if (err) {
				console.log("Error in query: ")
				console.log(err);
				callback(err, null);
			}

			console.log("Found result: " + JSON.stringify(result.rows));

			// call whatever function the person that called us wanted, giving it
			// the results that we have been compiling
			callback(null, result.rows);
		});
	});

} // end of getPersonFromDb














