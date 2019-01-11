// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/timestamp', (req, res) => {
	if ((new Date(req.query.date_string)).getTime()) {
		req.date = new Date(req.query.date_string);
		console.log(`The value of 'date_string' provided, ${req.query.date_string}, is valid, and the associated date is ${req.date}.`);
	} else if ((new Date(parseInt(req.query.date_string))).getTime()) {
		req.date = new Date(parseInt(req.query.date_string));
		console.log(`The value of 'date_string' provided, ${req.query.date_string}, is valid, the parsed value is ${parseInt(req.query.date_string)} and the associated date is ${req.date}.`);
	} else if (req.query.date_string) {
		req.date = new Date(req.query.date_string);
		console.log(req.date);
		console.log(`The value of 'date_string' provided, ${req.query.date_string}, is not valid.`);
	} else {
		req.date = new Date();
		console.log(`No value of 'date_string' has been provided, so the current date of ${req.date} will be used.`);
	}
	res.json({unix: (req.date).getTime(), utc: (req.date).toUTCString()});
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});