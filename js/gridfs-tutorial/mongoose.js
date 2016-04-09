var mongoose = require('mongoose');
var Grid = require('gridfs-stream');

//@param {Object} app - express app instance
module.exports.init = function(app) {
	var Schema;
	var conn;

	Grid.mongo = mongoose.mongo;
	conn = mongoose.createConnection('mongodb://localhost/awesome_db');
	conn.once('open', function() {
		var gfs = Grid(conn.db);
		app.set('gridfs', gfs);

		//ready to rock!
	});

	app.set('mongoose', mongoose);
	Schema = mongoose.Schema;
	//setup DB schema
	require('../db/schema')(Schema, app);
};