var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;


// This simple middleware function will log each request
var myLogger = function (req, res, next) {
  console.log("Received request for: " + req.url);

  // It is critical to call the next callback function so the rest of the
  // chain can be carried out.
  next();
}

// Use our middleware function for all requests
app.use(myLogger);

// These make it so we can access the POST data that is put in the body
// (e.g. the username and password)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Make sure to initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Any files in our "public" directory will be served up automatically
app.use(express.static(__dirname + '/public'));


// This is what passport will use to handle the authentication requests
passport.use(new LocalStrategy(
  function(username, password, done) {
  	// For now, we are just hardcoding a username and password
  	// But this is where we would want to look it up in the DB.
  	console.log("Checking username and password");

  	if (username == "admin" && password == "pass") {
  		// We have a successful login
  		console.log("Successful login for: " + username);

  		// Create a user object and send it along to passport's other functions
  		var user = Object();
  		user.id = 1;
  		user.name = username;

  		done(null, user)
  	} else {
  		// We have a failed login
  		console.log("Failed login attempt for: " + username);

  		// Let passport know that we have a failed login attempt
  		done(null, false, { message: "Incorrect username/password"});
  	}
  }
));

// Handle Posts to the /login route by using passports authenticate
app.post('/login',
  passport.authenticate('local', { successRedirect: '/welcome.html',
                                   failureRedirect: '/login.html',
                                   failureFlash: false })
);

// We need to tell passport how to turn our user object into a string to save it.
// This may consist of just saving an id to use later.
passport.serializeUser(function(user, done) {
 	done(null, user.name);
});

// We need to tell passport how to get a user object back from our string.
// This may consist of using the id to get the user information from the database. 
passport.deserializeUser(function(name, done) {
	var user = new Object();
	user.name = name;
	done(null, user);
});

// Finally set the port and start listening
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

