var mongoose = require('mongoose');
var User = mongoose.model('User');

function response_additions(err, data) {
    if (err) {
        this.json({
            error: err
        });
    }
    this.json({
        data
    });
}

function UsersController(){
	var _this = this;

	this.index = function(req, res){
		User.find({}, function(err, data){
			res.json(data);
		})
	};
	this.create = function(req, res){
		res.json({ placeholder:"create" })
	};
	this.show = function(req, res){
		res.json({ placeholder:"show" })
	};
	this.update = function(req, res){
		res.json({ placeholder:"update" })
	};
	this.delete = function(req, res){
		res.json({ placeholder:"delete" })
	};

	//Login and Register methods!!!
	this.login = function(req, res){
		User.findOne({
			email: req.body.email
		}, function(err, data){
			if (err){
				res.json({
					errors: {
						login_reg: {
							message: "Invalid user name and/or password",
							kind: "what didn't work",
							path: "referece to the schema's name",
							value: "cause of the initial error"
						}
					},
					name: "Validation error"
				});
			} else if (data && data.validPassword(req.body.password)) {
				res.json({
					_id: data._id
				});
			} else {
				res.json({
					errors: {
						login_reg: {
							message: "Invalid user name and/or password",
							kind: "what didn't work",
							path: "reference to the schema's name",
							value: "cause of the initial error"
						}
					},
					name: "Validation error"
				});
			}
		})
	}
	this.register = function(req, res){
		var user = new User(req.body);
		user.save(function(err, newuser){
			if (err){
				res.json(err);
			}
			else{
				res.json({
					_id: newuser._id
				});
			}
		});
	}
}
module.exports = new UsersController();