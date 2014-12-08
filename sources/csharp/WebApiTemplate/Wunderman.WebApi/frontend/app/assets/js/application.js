var app = angular.module('main',['ngRoute', 'ngResource', 'ngCookies']);
app.run(function ($rootScope, Auth, $location, $route, $cookieStore) {
	$rootScope.number = 0;
	$rootScope.logged = false;

	$rootScope.$on('$locationChangeStart', function (event, next) {
		var nextPath  = $location.path(),
	        nextRoute = $route.routes[nextPath],
	        authdata = $cookieStore.get( 'authdata' );

          if(!$rootScope.logged && typeof authdata !== 'undefined' ){
          	Auth.authenticate()
          		.then(function(){
          			$rootScope.logged = true;
          		});
          } else if (nextRoute.logged && !$rootScope.logged) {
	          Auth.loginRedirect();
	      }
  	});
});
app.config(function ($locationProvider, $routeProvider, $httpProvider) {
  var baseUrl = "frontend/app/assets/views";
  $locationProvider.html5Mode(true).hashPrefix('!');

  $httpProvider.interceptors.push('httpInterceptor');

  $routeProvider
  .when('/', {
    controller: 'HomeController',
    templateUrl: baseUrl + '/home.html'
  })
  .when('/login', {
    controller: 'LoginController',
    templateUrl: baseUrl + '/login.html'
  })
  .when('/404', {
    templateUrl: baseUrl + '/404.html'
  })
  .when('/admin', {
    controller: 'AdminController',
    templateUrl: baseUrl + '/admin/home.html',
    logged: true
  })
  .otherwise({ redirectTo: '/404' });
})
app.controller('AdminController', function ($scope) {
  
});
app.controller('HomeController', function ($scope, $http, dataFactory, $timeout) {

    $scope.customers;
    $scope.orders;
    $scope.status = false;
    $scope.status_show = false;
    $scope.action = "Insert";

    getCustomers();

    function getCustomers() {
        dataFactory.getCustomers()
            .success(function (custs) {
                $scope.customers = custs;
            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    };

     $scope.updateCustomer = function (id) {
        
        var cust;

        for (var i = 0; i < $scope.customers.length; i++) {
            var currCust = $scope.customers[i];
            if (currCust.Id === id) {
                cust = currCust;
                break;
            }
        }

        dataFactory.updateCustomer(cust)
          .success(function () {
              $scope.status = 'Updated Customer! Refreshing customer list.';
              isInsert();
              resetForm();
          })
          .error(function (error) {
              $scope.status = 'Unable to update customer: ' + error.message;
          });
          showMessage();
    };

    $scope.insertCustomer = function (cust) {

        if( cust.Id != undefined ){
            $scope.updateCustomer(cust.Id);
            return;
        }

        dataFactory.insertCustomer(cust)
            .success(function (custLast) {
                $scope.status = 'Inserted Customer! Refreshing customer list.';
                resetForm();
                getCustomers();
            }).
            error(function(error) {
                $scope.status = 'Unable to insert customer: ' + error.message;
            });
            showMessage();
    };

    $scope.deleteCustomer = function (id) {
        dataFactory.deleteCustomer(id)
        .success(function () {
            $scope.status = 'Deleted Customer! Refreshing customer list.';
            for (var i = 0; i < $scope.customers.length; i++) {
                var cust = $scope.customers[i];
                if (cust.Id === id) {
                    $scope.customers.splice(i, 1);
                    break;
                }
            }
            $scope.orders = null;
            showMessage();
        })
        .error(function (error) {
            $scope.status = 'Unable to delete customer: ' + error.message;
        });
    };

    $scope.getCustomerOrders = function (id) {
        dataFactory.getOrders(id)
        .success(function (orders) {
            $scope.status = 'Retrieved orders!';
            $scope.orders = orders;
        })
        .error(function (error) {
            $scope.status = 'Error retrieving customers! ' + error.message;
        });
    };

    $scope.insertCustomerInForm = function(id){
        for (var i = 0; i <= $scope.customers.length; i++) {
            var cust = $scope.customers[i];
            if (cust.Id == id) {
                
                $scope.cust = $scope.customers[i];
                isUpdate();

                break;
            }
        }
        scrollTop();
        return false;
    }

    $scope.cancelUpdate = function(){
        resetForm();
        isInsert();
    }

    var scrollTop = function(){
        var body = $("html, body");
        body.animate({scrollTop:0}, '500', 'swing');
    }

    var resetForm = function(){
        $scope.cust = {};
    }

    var clearMessage = function(){
        $timeout(function() {
            $scope.status_show = false;
        }, 3000);
    }

    var showMessage = function(){
        $scope.status_show = true;
        clearMessage();
    }

    var isInsert = function(){
        $scope.action = "Insert";
        $scope.show_cancel = false;
    }

    var isUpdate = function(){
        $scope.action = "Update";
        $scope.show_cancel = true;
    }
});
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
app.directive('alertMessage', function(){
	return {
		templateUrl: 'templates/alertMessage.html',
		replace: true
	};
});
app.factory('Auth', function (Base64, $cookieStore, $http, $location, $injector) {
    var urlBase = '/api/login';
    
    return {
        /*
            Tentar autenticar
        */
        authenticate: function(){
            return $http.post( urlBase );
        },
        setCredentials: function (username, password) {
            //seto as credenciais no header para autenticacao
            var encoded = Base64.encode(username + ':' + password);
            $cookieStore.put('authdata', encoded);

            //autentico
            return this.authenticate();
        },
        /*
            funcao para limpar a credencial
        */
        clearCredentials: function () {
            document.execCommand("ClearAuthenticationCache");
            $cookieStore.remove( 'authdata' );
            $http.defaults.headers.common['Authorization'] = "";
        },
        /*
            redirecionar para pagina de login
        */
        loginRedirect: function(){
            $location.path("/login");
        }
    };
});
app.factory('Base64', function() {
    var keyStr = 'ABCDEFGHIJKLMNOP' +
        'QRSTUVWXYZabcdef' +
        'ghijklmnopqrstuv' +
        'wxyz0123456789+/' +
        '=';
    return {
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
 
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
 
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
 
                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
 
            return output;
        },
 
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));
 
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
 
                output = output + String.fromCharCode(chr1);
 
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
 
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
 
            } while (i < input.length);
 
            return output;
        }
    };
});
app.factory('dataFactory', ['$http', function($http) {

    var urlBase = '/api/customer';
    var dataFactory = {};

    dataFactory.getCustomers = function () {
        return $http.get(urlBase);
    };

    dataFactory.getCustomer = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    dataFactory.insertCustomer = function (cust) {
        return $http.post(urlBase, cust);
    };

    dataFactory.updateCustomer = function (cust) {
        return $http.put(urlBase + '/' + cust.Id, cust)
    };

    dataFactory.deleteCustomer = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    return dataFactory;
}]);
app.factory("httpInterceptor", function($q, $cookieStore, $injector) {

  return {
    
    request: function( config ){

      //Inject plugins
      var $route = $injector.get('$route');
      var Auth = $injector.get('Auth');

      var authdata = $cookieStore.get( 'authdata' );

      //-- headers --//
      var headers = config.headers;
      if(typeof authdata !== 'undefined'){
        headers['Authorization'] = 'Basic ' + authdata;    
      }

      //headers['Accept'] = 'application/json',
      headers['X-Requested-With'] = 'XMLHttpRequest';
      //-- /headers --//

      return config || $q.when( config );
    },
    
    responseError: function( response ) {
      
      var Auth = $injector.get('Auth');

      if ( response.status === 401 ) {
        Auth.loginRedirect();
      }

      return $q.reject(response);
    }

  };
});