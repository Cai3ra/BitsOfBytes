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