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

	results = [];
	pg.connect(connectionString, (err, client, done) => {
		if (err) {
			done();
			console.log("Error connecting to DB: ")
			console.log(err);
			callback(err, null);
		}

		var sql = "SELECT id, first, last, birthdate FROM person WHERE id = $1::int";
		var params = [id];

		var query = client.query(sql, params);
		query.on('row', (row) => {
			// Each time we get a row from the DB, we can append it to our growing resultset
			results.push(row);
		});

		query.on("end", () => {
			// we are now done getting the data from the DB
			done();

			// call whatever function the person that called us wanted, giving it
			// the results that we have been compiling
			callback(null, results);
		});
	});

} // end of getPersonFromDb














