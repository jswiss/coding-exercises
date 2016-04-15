//Define variables & dependencies

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var controllers = require('./controllers');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var port = process.env.PORT || 3000;

//Configure Express

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
// Without this you would need to
// supply the extension to res.render()
// ex: res.render('users.html').
app.set('view engine', 'html');

app.use(bodyParser());
app.use(methodOverride());
app.use(express.static(__dirname + '/public'));
app.use('/images', express.static(__dirname + '/writable'));
app.engine('html', require('ejs').renderFile);


//Define routes
app.get('/', controllers.index);
app.post('/upload', controllers.upload);

//Start the server
server.listen(port, function() {
  console.log("Express server up and running on port " + port);
});