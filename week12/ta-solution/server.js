var path = require('path');
var express = require('express');
var app = express();

// We are going to use sessions
var session = require('express-session')

// set up sessions
app.use(session({
  secret: 'my-super-secret-secret!',
  resave: false,
  saveUninitialized: true
}))

// Because we will be using post values, we need to use the body parser middleware
app.use(express.json() );       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

app.set('port', (process.env.PORT || 5000));

// We have html and js in the public directory that need to be accessed
app.use(express.static(path.join(__dirname, 'public')))

// This shows how to use a middleware function for all requests (it is defined below)
// Becuse it comes after the static function call, we won't see it log requests
// for the static pages, only the ones that continue on passed that (e.g., /logout)
app.use(logRequest);

// Setup our routes
app.post('/login', handleLogin);
app.post('/logout', handleLogout);

// This method has a middleware function "verifyLogin" that will be called first
app.get('/getServerTime', verifyLogin, getServerTime);

// Start the server
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



/****************************************************************
 * These methods should likely be moved into a different module
 * But they are here for ease in looking at the code
 ****************************************************************/

// Checks if the username and password match a hardcoded set
// If they do, put the username on the session
function handleLogin(request, response) {
	var result = {success: false};

	// We should do better error checking here to make sure the parameters are present
	if (request.body.username == "admin" && request.body.password == "password") {
		request.session.user = request.body.username;
		result = {success: true};
	}

	response.json(result);
}

// If a user is currently stored on the session, removes it
function handleLogout(request, response) {
	var result = {success: false};

	// We should do better error checking here to make sure the parameters are present
	if (request.session.user) {
		request.session.destroy();
		result = {success: true};
	}

	response.json(result);
}

// This function returns the current server time
function getServerTime(request, response) {
	var time = new Date();
	
	var result = {success: true, time: time};
	response.json(result); 
}

// This is a middleware function that we can use with any request
// to make sure the user is logged in.
function verifyLogin(request, response, next) {
	if (request.session.user) {
		// They are logged in!

		// pass things along to the next function
		next();
	} else {
		// They are not logged in
		// Send back an unauthorized status
		var result = {success:false, message: "Access Denied"};
		response.status(401).json(result);
	}
}

// This middleware function simply logs the current request to the server
function logRequest(request, response, next) {
	console.log("Received a request for: " + request.url);

	// don't forget to call next() to allow the next parts of the pipeline to function
	next();
}
