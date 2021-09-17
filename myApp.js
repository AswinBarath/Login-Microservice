var express = require('express')
var app = express();

// Mounting the Body Parser middleware - For receiving form data
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

// Root level logger - Logs the requests made to the server
app.use(function(req, res, next) {
	console.log(`${req.method} ${req.path} - ${req.ip}`);
	next();
});

// Serves the index.html file
app.get('/', function(req, res) {
	let path = __dirname + "/views/index.html";
	res.sendFile(path);
});

// Serves the style.css file
let path = __dirname + "/public";
app.use("/public", express.static(path));

// Handles the form data
var postHandler = function(req, res) {
	res.json({name: `${req.body.first} ${req.body.last}`});
};
app.route('/name').post(postHandler);

module.exports = app;
