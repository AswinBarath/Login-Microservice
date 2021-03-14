var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));


app.post('/name', function(req, res, next) {
	query = req.body;
	first = query.first.toString();
	last = query.last.toString();
	next();
}, function(req, res) {
	res.send({name: `${first} ${last}`})
})


app.get('/name', function(req, res, next) {
	query = req.query;
	first = query.first.toString();
	last = query.last.toString();
	next();
}, function(req, res) {
	res.send({name: `${first} ${last}`})
})


app.get('/:word/echo', function(req, res) {
	word = req.params.word;
	res.send({echo: word});
})


app.get('/now', function(req, res, next) {
	req.time = new Date().toString();
	next();
}, function(req, res) {
	res.send({time: req.time})
})


console.log("Hello World")


app.use(function(req, res, next) {
  console.log(req.method, req.path, "-", req.ip);
  next();
})


app.get('/', function(req, res) {
	let path = __dirname + "/views/index.html"
	res.sendFile(path)
})


let path = __dirname + "/public";
app.use("/public", express.static(path))


app.get('/json', function(req, res) {
    if(process.env.MESSAGE_STYLE == "uppercase") {
        let obj = {message: "HELLO JSON"}
        res.json(obj)
    }
    let obj = {message: "Hello json"}
	res.json(obj)
})


module.exports = app;
