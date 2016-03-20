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
};