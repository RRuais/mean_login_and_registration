var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//Creating the Schema
var UserSchema = new mongoose.Schema({
	first_name: {
		type: String,
		required: true
	},
	last_name: {
		type: String, 
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true,
		// validate: {
		// 	validator: function( value ){
		// 		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		// 		return re.test( value );
		// 	},
		// 	message: "Please enter a valid email address"
		// }
	},
	password: {
		type: String,
		required: true,
		// minlength: 5,
		// validate: {
		// 	validator: function( value ){
		// 		var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/;
		// 		return re.test( value );
		// 	},
		// 	message: "Password must have at least 1 number, uppercase, and special character"
		// }
	},
	birthdate: {
		type: Date,
		required: true
	}
}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});

// Hash creation!!!
UserSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// Checking if password is valid
UserSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password);
};

UserSchema.pre('save', function(done){
	this.password = this.generateHash(this.password);
	done();
});

var User = mongoose.model('User', UserSchema);