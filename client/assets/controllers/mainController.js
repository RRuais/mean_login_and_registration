app.controller('mainController', ['$scope', 'usersFactory', function($scope, usersFactory){
	$scope.users;

	usersFactory.getUsers(function(users){
		$scope.users = users
	})
	var index = function(){
		usersFactory.index(function(returnedData){
			$scope.users = returnedData;
		});
	};
	index();
}])