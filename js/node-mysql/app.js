//Basic Setup
//================================
var express    = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser());

var env = app.get('env') == 'development' ? 'dev' : app.get('env');
var port = process.env.PORT || 8080;

//Import Models
//======================================
var Sequelize = require('sequelize');

//db config
var env = "dev";
var config = require('./database.json')[env];
var password = config.password ? config.password : null;

//Initialise db connection
var sequelize = new Sequelize(
  config.database,
  config.user,
  config.password,
  {
    dialect: config.driver,
    logging: console.log,
      define: {
        timestamps: false
      }
  }
);

var crypto = require('crypto');
var DataTypes = require('sequelize');

var User = sequelize.define('users', {
  username: DataTypes.STRING,
  password: DataTypes.STRING
}, {
  instanceMethods: {
    retrieveAll: function(onSuccess, onError) {
      User.findAll({}, {raw: true}).success(onSuccess).error(onError);
    },
    retrieveById: function(user_id, onSuccess, onError) {
      User.find({where: {id: user_id}}, {raw: true}).success(onSuccess).error(onError);
    },
    add: function(onSuccess, onError) {
      var username = this.username;
      var password = this.password;

      var shasum = crypto.createHash('sha1');
      shasum.update(password);
      password = shasum.digest('hex');

      User.build({ username: username, password: password}).save().success(onSuccess).error(onError);

    }, 
    updateByID: function(user_id, onSuccess, onError) {
      var id = user_id;
      var username = this.username;
      var password = this.password;
      
      var shasum = crypto.createHash('sha1');
      shasum.update(password);
      password = shasum.digest('hex');

      User.update({ username: username, password: password}, {where: {id: id} }).success(onSuccess).error(onError);
    },
    removeById: function(user_id, onSuccess, onError) {
      User.destroy({ where: {id: user_id} }).success(onSuccess).error(onError);
    }
  }
});

//Import Routes
//=======================================================
var router = express.Router();

//on routes that end in /users
//--------------------------------------
router.route('/users')

//create a user (accessed at POST http://localhost:8080/api/users)
.post(function(req, res) {

  var username = req.body.username; //bodyParser in action here, yo!
  var password = req.body.password;

  var user = User.build({ username: username, password: password });

  user.add(function(success) {
    res.json({ message: 'User created!!!' });
  },
  function(err) {
    res.send(err);
  });
})

//get all teh users (accessed at GET http://localhost:8080/api/users)
.get (function(req, res) {
  var user = User.build();

  user.retrieveAll(function(users) {
    if(users) {
      res.json(users);
    } else {
      res.send(401, "User ain't found");
    }
  }, function(error) {
    res.send("User ain't here!");
  });
});

//on routes that end in /users/:user_id
//---------------------------------------
router.route('/users/:user_id')

//update a user (accessed at PUT http://localhost:8080/api/users/:user_id)
.put(function(req, res) {
  var user = User.build();

  user.username = req.body.username;
  user.password = req.body.password;

  user.updateByID(req.params.user_id, function(success) {
    console.log(success);
    if(success) {
      res.json({ message: 'User is updated!' });
    } else {
      res.send(401, "User not found!");
    }
  }, function(error) {
    res.send("User not found!");
  });
})

//get a user by id(accessed at GET http://localhost:8080/api/users/:user_id)
.get(function(req, res) {
  var user = User.build();

  user.retrieveById(req.params.user_id, function(users) {
    if(users) {
      res.json(users);
    } else {
      res.send(401, "User not found");
      }
    }, function(error) {
      res.send("User not found");
  });
})

//delete a user by id (accessed at DELETE http://localhost:8080/api/users/:user_id)
.delete(function(req, res) {
  var user = User.build();

  user.removeById(req.params.user_id, function(users) {
    if(users) {
      res.json({ message: 'User Removed for ever!' });
    } else {
      res.send(401, "User not found");
    }
  }, function(error) {
    res.send("User not found");
  });
});

//Middleware to use for all requests
router.use(function(req, res, next) {
  //do logging
  console.log('Something is happening over here');
  next();
});

//Register our Routes
//===============================================
app.use('/api', router);

//Start the server
//================================================

app.listen(port);
console.log('We running ' + port + ' sucka!');
