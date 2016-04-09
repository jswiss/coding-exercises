var express = require('express');
var app     = express();
var mongo   = require('mongodb');
var Server  = mongo.server;
var Db      = mongo.Db;

Db.connect("mongodb://localhost:27017/mongo-grid", {auto_reconnect: true}, function(err, db) {
	if(!err) {
		console.log('we are connected!');
	}
});

db.open(function(err, db) {
	if(err) {
		return console.dir(err);
	}
	//Will not create a collection until first document is inserted
	db.collection('test', function(err, collection) {});
	//Will check if collection exists and throw an error if now
	db.collection('test', {w:1}, function(err, collection) {});
	//Will create collection on MongoDB before returning collection object. If collection exists it will ignore the creation
	db.createCollection('test', function(err, collection) {});
	//Same as above, but will throw an error if the collection exists
	db.createCollection('test', {w:1}, function(err, collection) {});
});

db.open(function(err, db) {
	if(err) {
		return console.dir(err);
	}
	var collection = db.collection('test');
	var doc1       = {'hello': 'doc1'};
	var doc2       = {'hello': 'doc2'};
	var lotsOfDocs = [{'hello': 'doc3'}, {'hello': 'doc4'}];

	collection.insert(doc1);
	collection.insert(doc2, {w:1}, function(err, result) {});
	collection.insert(lotsOfDocs, {w:1}, function(err, result) {});

});

db.open(function(err, db) {
	if(err) {
		return console.dir(err);
	}
	var collection = db.collection('test');
	var doc        = {mykey: 1 , fieldtoupdate: 1};

	collection.insert(doc, {w:1}, function(err, result) {
		collection.update({mykey:1}, {$set{fieldtoupdate:2}}, {w:1}, function(err, result) {});
	});

	var doc2 = {mykey:2, docs:[{doc1:1}]};

	collection.insert(doc, {w:1}, function(err, result) {
		collection.update({mykey:2}, $push:{docs:{doc2:1}}, {w:1}, function(err, result) {});
	})
})

