app.factory('usersFactory', ['$http', function($http){
	var users = [];

	var UsersFactory = function(){
		var _this = this; 

		this.login = function(data, callback){
			$http.post('/login', data).then(function(returned_data){
				console.log(returned_data);
				callback(returned_data);
			});
		}
		this.index = function(callback){
			$http.get('/users').then(function(returned_data){
				users = returned_data.data;
				callback(users);
			});
		}
		this.register = function(data, callback){
			$http.post('/register', data).then(function(returned_data){
				console.log(returned_data);
				if (returned_data.data.errors){
					console.log(returned_data.data.errors);
				}
				else if (returned_data.data.code){
					console.log(returned_data.data.errmsg);
				}
				else{
					console.log(returned_data.data);
				}

				if (typeof(callback) == 'function'){
					callback(returned_data);
				}
			});
			
		}
	}
	console.log(new UsersFactory());
	return new UsersFactory;
}]);