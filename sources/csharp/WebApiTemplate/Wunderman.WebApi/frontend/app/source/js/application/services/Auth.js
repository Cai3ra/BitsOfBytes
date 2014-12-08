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