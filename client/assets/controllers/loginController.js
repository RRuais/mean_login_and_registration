app.controller('loginController', ['$scope', 'usersFactory', function($scope, usersFactory){
	$scope.registration = {};
	$scope.userLogin = {};
	$scope.errors = {};
	$scope.users = [];
	$scope.user = {};

	var index = function(){
		usersFactory.index(function(returnedData){
			$scope.users = returnedData;
		});
	};
	index();

	$scope.register = function(){
		if ($scope.registration.password != $scope.registration.confirm_password){
			$scope.errors = { password: {message: "Password and Password Confirmation must match"}}
		}
		else{
			usersFactory.register($scope.registration, function(returnedData){
				if (returnedData.data.errors){
					$scope.errors = returnedData.data.errors;
				}
				else if (returnedData.data.code){
					$scope.errors = { email: {message: "Email already in use"}}
				}
				else{
					$scope.user = returnedData.data;
				}
			});
		}	
		$scope.registration = {};
		index();
	}
	$scope.login = function(){
		usersFactory.login($scope.userLogin, function(returnedData){
			if(returnedData.data.errors){
				$scope.errors = returnedData.data.errors;
			}
			else{
				$scope.user = returnedData.data;
			}
		});
		$scope.userLogin = {};
	}
}])