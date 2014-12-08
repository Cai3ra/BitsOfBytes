app.controller('LoginController', function ($scope, Auth, $location) {
	
	$scope.credentials = {};

	$scope.login = function(credentials){
		
		var call = {
			authSuccess: function(response){
				$scope.logged = true;
				$location.path('/admin');
			},
			authError: function(response){
				//caso o usuario nao logar apago as credenciais
				$scope.logged = false;

				if(response.status === 401){
					Auth.clearCredentials();
				}
				
				console.log("Erro ao tentar logar: " + response.statusText + "; Código: " + response.status);
        	}
        };

		Auth.setCredentials(credentials.username, credentials.password)
			.then(call.authSuccess, call.authError);
	}
})