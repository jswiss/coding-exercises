//Pulls Mongoose dependencies for creating schema
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

//Creates a User Schema. This will be the basis for how data is stored in the DB
var UserSchema = new Schema({
  username:     {type: String, required: true},
  gender:       {type: String, required: true},
  age:          {type: Number, required: true},
  favlang:      {type: String, required: true},
  location:     {type: [Number], required: true},  //array allows for [LON, LAT]
  htmlverified: String,
  created_at:   {type: Date, default: Date.now},
  uploaded_at:  {type: Date, default: Date.now}
});

//Sets the created_at parameter equal to the current time
UserSchema.pre('save', function(next) {
  now = new Date();
  this.updated_at = now;
  if(!this.created_at) {
    this.created_at = now
  }
  next();
});

// Indexes this schema in 2dsphere format (critical for running proximity searches)
UserSchema.index({location: '2dsphere'});

// Exports the UserSchema for use elsewhere. Sets the MongoDB collection to be used as: "scotch-users"
module.exports = mongoose.model('scotch-user', UserSchema);