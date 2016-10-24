//Standard express setup
var express = require('express'),
app = express(),
path = require('path'),
// mongoose = require('mongoose'),
bodyParser = require('body-parser'),
port = process.env.PORT || 8000;

// set an environment variable called APPROOT to keep track of the root folder of your app
process.env['APPROOT'] = __dirname;

// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(process.env['APPROOT'], './client')));
app.use(express.static(path.join(process.env['APPROOT'], './bower_components')));

// DATABASE
//require mongoose configuration, use path.join to build the route
require(path.join(process.env['APPROOT'], 'server/config/mongoose.js'));

// ROUTES 
//require routes configuration, get a function from the module.exports, that gets invoked while passing it the app
require(path.join(process.env['APPROOT'], 'server/config/routes.js'))(app);
// alternative way
// require("./server/config/routes.js")(app);

app.listen(port, function(){
	console.log("server running on port", port);
});