var mongoose = require('mongoose');
var User = mongoose.Schema('User');
var users = require('../controllers/users.js');

module.exports = function(app){
	//index
	app.get('/users', users.index);
	//show 
	app.get('/users/:id', users.show);
	//create
	app.post('/users', users.create);
	//update
	app.put('/users/:id', users.update);
	//delete
	app.delete('/users/:id', users.delete);


	//login and registration routes!!!!
	app.post('/login', users.login);
	app.post('/register', users.register);

}