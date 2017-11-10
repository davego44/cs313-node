var express = require('express');
var app = express();

var lettersS = {'1' : '.49', '2' : '.70', '3' : '.91', '3.5' : '1.12'};
var lettersM = {'1' : '.46', '2' : '.67', '3' : '.88', '3.5' : '1.09'};
var largeEnvF = {'1' : '.98', '2' : '1.19', '3' : '1.40', '4' : '1.61', '5' : '1.82', 
				 '6' : '2.03', '7' : '2.24', '8' : '2.45', '9' : '2.66', '10' : '2.87', 
				 '11' : '3.08', '12' : '3.29', '13' : '3.50'};
var parcels = {'4' : '3.00', '5' : '3.16', '6' : '3.32', '7' : '3.48', '8' : '3.64', 
			   '9' : '3.80', '10' : '3.96', '11' : '4.19', '12' : '4.36', '13' : '4.53'};

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

var calculate = require(__dirname + '/public/javascript/calculate.js');

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/getData', function(request, response) {
	response.setHeader('Content-Type', 'application/json');
	response.send(JSON.stringify({ lettersS: lettersS, lettersM: lettersM, largeEnvF: largeEnvF, parcels: parcels }));
});

app.get('/getRate', function(request, response) {
	var weight = parseFloat(request.query.weight);
	var type = request.query.type;
	var typeStr = "";
	if (type == "lettersS") {
		typeStr = "Letters (Stamped)";
	} else if (type == "lettersM") {
		typeStr = "Letters (Metered)";
	} else if (type == "largeEnvF") {
		typeStr = "Large Envelopes (Flat)";
	} else if (type == "parcels") {
		typeStr = "Parcels"
	}
	calculate(lettersS, lettersM, largeEnvF, parcels, type, weight,
		function callback(error, value) {
			var result;
			
			if (error == null) {
				result = value;
			} else if (error == "invalidArgs") {
				result = "Invalid Input";
			} else if (error == "tooHeavy") {
				result = "Too Heavy";
			} else {
				result = "";
			}
			response.render('pages/results', { weight: weight, type: typeStr, cost: result });
		});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
