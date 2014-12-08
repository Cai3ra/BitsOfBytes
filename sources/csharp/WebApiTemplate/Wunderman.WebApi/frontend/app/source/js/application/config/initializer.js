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