var fileParse = require('./fileParse');
var executeQuery = require('./executeQuery');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();


app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

//app.use('/',express.static('public'));

app.get('/api/keys', function(req, res) {
	res.json(global.keys);
});

app.get('/api/category', function(req, res) {
	executeQuery(null, function(err, result) {
		if (err)
			console.error(err.message);
		res.json(result);
	});
});


app.post('/api/company', function(req, res) {
	executeQuery({
		category: req.body.category
	}, function(err, result) {
		if (err)
			console.error(err.message);
		res.json(result);
	});
});

app.post('/api/funds', function(req, res) {
	executeQuery({
		category: req.body.category,
		company: req.body.company
	}, function(err, result) {
		if (err)
			console.error(err.message);
		res.json(result);
	});
});

var server = app.listen(app.get('port'), function() {
	var host = server.address().address;
	var port = server.address().port;
	fileParse('mutualfund.txt', function() {
		console.log('Example app listening at port %s', app.get('port'));
	});
});