var express          = require('express');
var app              = express();
var busboyBodyParser = require('busboy-body-parser');
var mongoose         = require('mongoose');
var port             = process.env.PORT || 3000;

app.use(busboyBodyParser());

mongoose.connect('mongodb://localhost:27017/gridfs');

app.listen(port, function() {
  console.log('server started on port: ' + port);
})