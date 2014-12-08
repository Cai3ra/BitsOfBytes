var app = angular.module('main',['ngRoute', 'ngResource', 'ngCookies']);
app.run(function ($rootScope, $cookieStore, $resource, $location, $route, Auth) {
		$rootScope.$on('$locationChangeStart', function(evt, next, current) {
		    var nextPath = $location.path(),
		        nextRoute = $route.routes[nextPath];
		    if (nextRoute.logged) {
                Auth.authenticate(function(authorized){
                    if(!authorized){
                        $location.path("/login");
                    }
                });
		    }
		  });
});
app.config(['$httpProvider', '$routeProvider', '$locationProvider',
          function ($httpProvider, $routeProvider, $locationProvider) {
  
  var baseUrl = "frontend/app/assets/views";
  $locationProvider.html5Mode(true).hashPrefix('!');
  //$httpProvider.interceptors.push('httpInterceptor');

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
}]);

app.factory("httpInterceptor", function($rootScope, $q, $location) {
  return {
    request: function(config){
        
    },
    response: function(response) {
        return response || $q.when(response);
    },
    responseError: function(response) {
      if (response.status === 401) {
          $location.path("/login");
          return;
      }
      return $q.reject(response);
    }
  };
});

app.factory('Auth', ['Base64', '$cookieStore', '$http', function (Base64, $cookieStore, $http) {
    var urlBase = 'http://localhost:61810/api/login';
    return {
        authenticate: function(cb){
            $http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
            $http.defaults.headers.common.Authorization = 'Basic ' + $cookieStore.get('authdata');

            $http.post( urlBase )
            .success(function(data, status, headers, config) {
                if(cb){
                    cb(true);
                }
            })
            .error(function(data, status, headers, config) {
                if(cb){
                    cb(false);
                }
            });
        },
        setCredentials: function (username, password, cb) {
            var encoded = Base64.encode(username + ':' + password);
            $cookieStore.put('authdata', encoded);
            this.authenticate(cb);
        },
        clearCredentials: function () {
            document.execCommand("ClearAuthenticationCache");
            $cookieStore.remove('authdata');
            $http.defaults.headers.common.Authorization = 'Basic ';
        }
    };
}]);

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

app.controller('AdminController', ['$scope', '$rootScope', '$resource', '$sce', function ($scope, $rootScope, $resource, $sce) {
  
}]);
app.controller('HomeController', 
			['$scope', '$rootScope', '$http', 'dataFactory', '$timeout', 
	function ($scope, $rootScope, $http, dataFactory, $timeout) {

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
}]);
app.controller('LoginController', function ($scope, $rootScope, $http, Auth, $location) {
	$scope.credentials = {};

	$scope.login = function(credentials){
		Auth.setCredentials(credentials.username, credentials.password, function(success){
            if(success){
                $location.path('/admin');
            }
        });
	}
})
app.factory('dataFactory', ['$http', function($http) {

    var urlBase = 'http://localhost:61810/api/customer';
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