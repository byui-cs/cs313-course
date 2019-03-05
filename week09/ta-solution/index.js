const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/math', handleMath);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function handleMath(request, response) {
	const operation = request.query.operation;
	const operand1 = Number(request.query.operand1);
	const operand2 = Number(request.query.operand2);

	// TODO: Here we should check to make sure we have all the correct parameters

	computeOperation(response, operation, operand1, operand2);
}

function computeOperation(response, op, left, right) {
	op = op.toLowerCase();

	let result = 0;

	if (op == "add") {
		result = left + right;
	} else if (op == "subtract") {
		result = left - right;		
	} else if (op == "multiply") {
		result = left * right;
	} else if (op == "divide") {
		result = left / right;
	} else {
		// It would be best here to redirect to an "unknown operation"
		// error page or something similar.
	}

	// Set up a JSON object of the values we want to pass along to the EJS result page
	const params = {operation: op, left: left, right: right, result: result};

	// Render the response, using the EJS page "result.ejs" in the pages directory
	// Makes sure to pass it the parameters we need.
	response.render('pages/result', params);

}

