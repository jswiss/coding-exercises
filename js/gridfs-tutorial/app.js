var express     = require('express');
var app         = express();
var server      = require('http').createServer(app);
var controllers = require('./controllers');

//Config Express

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');

// Without this you would need to
// supply the extension to res.render()
// ex: res.render('users.html')
app.set('view engine', 'html');

app.configure(function() {
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.static(__dirname = '/public'));
	app.use('/images', express.static(__dirname + '/writable'));
	app.use(app.router);
	app.engine('html', require('ejs').renderFile);
});

//start server
server.listen(3000, function() {
	console.log('express server up and running');
});