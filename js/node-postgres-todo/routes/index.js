var express = require('express');
var router  = express.Router();
var pg      = require('pg');
var path    = require('path');
var connectionString = require(path.join(__dirname, '../', './', 'config'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

router.post('/api/v1/todos', function(req, res) {
	var results = [];

	//Grab data from HTTP request
	var data = {
		text: req.body.text,
		complete: false
	};

	//Get a postgres client from the connection pool
	pg.connect(connectionString, function(err, client, done) {
		//Handle connection errors
		if(err) {
			done();
			console.log(err);
			return res.status(500).json({
				success: false,
				data: err
			});
		}

		//SQL Query > INSERT data
		client.query("INSERT INTO items(text, complete) values($1, $2), [data.text, data.complete]");

		//SQL Query > SELECT data
		var query = client.query("SELECT * FROM items ORDER BY id ASC");

		//Stream results back one by one
		query.on('row', function(row) {
			results.push(row);
		});

		//After all data is returned, close connection and return results
		query.on('end', function() {
			done();
			return res.json(results);
		});
	});
});
