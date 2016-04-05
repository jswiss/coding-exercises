//Dependencies
var mongoose = require('mongoose');
var User     = require('./model.js');

//Open App Routes
module.exports = function(app) {

  //GET Routes
  //----------------------------------------------
  //Retrieve records for all users in the DB
  app.get('/users', function(req, res) {

    //Uses Mongoose Schema to run the search (empty conditions)
    var query = User.find({});
    query.exec(function(err, users) {
      if(err) 
        res.send(err);

      //If no errors are found, a JSON is returned containing all users
      res.json(users);
    });
  });

  //POST Routes
  //-----------------------------------------------
  //Provides method for saving new users to the DB

  app.post('/users', function(req, res) {

    //Creates a new user based on mongoose schema and the post body
    var newUser = new User(req.body);

    //New User is saved in the DB
    newUser.save(function(err) {
      if(err)
        res.send(err);

      //If no errors are found, it responds with a JSON of the new user
      res.json(req.body);
    });
  });

  //Retrieves JSON records for all users who meet a certain set of query conditions
  app.post('/query/', function(req, res) {

    //Grab all of the query parameters from the body
    var lat      = req.body.latitude;
    var long     = req.body.longitude;
    var distance = req.body.distance;

    //Opens a generic Mongoose Query. Depending on the post we will...
    var query = User.find({});

    // ...include filter by Mzx Distance (converting miles to meters)
    if (distance) {

      //Using MongoDB's geospatial querying features. (Note how coordinates are set [long, lat])
      query = query.where('location').near({ center: {type: 'Point', coordinates: [long, lat]}, 

        //Converting meters to miles. Specifying spherical geometry for globe
        maxDistance: distance * 1609.34, spherical: true});
    }

    // ...Other queries will go here...

    //Execute Query and Return the Query Results
    query.exec(function(err, users) {
      if (err) {
        res.send(err);
      } else {
        res.json(users);
      };
    });
  });
};