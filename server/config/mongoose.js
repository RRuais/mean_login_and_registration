//require mongoose
var mongoose = require('mongoose'),
//require the fs module for loading model files
fs = require('fs'),
//require path for getting the models path
path = require('path'),
//Regular expression that checks for .js extension
reg = new RegExp( ".js$", "i" ),
// create a variable that points to the path where all of the models live
models_path = path.join(__dirname, './../models'),
//database info
dbURI = 'mongodb://localhost/login_and_registration';

// connect to db
mongoose.connect(dbURI);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on( 'connected', function () {
  console.log( `Mongoose default connection open to ${ dbURI }` );
});

// If the connection throws an error
mongoose.connection.on( 'error', function ( err ) {
  console.error( `Mongoose default connection error: ${ err }` );
});

// When the connection is disconnected
mongoose.connection.on( 'disconnected', function () {
  console.log( 'Mongoose default connection disconnected' );
});

// If the Node process ends, close the Mongoose connection
process.on( 'SIGINT', function() {
  mongoose.connection.close( function () {
    console.log( 'Mongoose default connection disconnected through app termination' );
    process.exit( 0 );
  });
});

// read all the files in the models_path and require (run) each of the js files
// check if it is a javascript file before requiring it
fs.readdirSync(models_path).forEach(function(file) {
  if(reg.test( file )) {
    // require the file (this runs the model file which registers the schema)
    require(path.join( models_path, file));
  }
});