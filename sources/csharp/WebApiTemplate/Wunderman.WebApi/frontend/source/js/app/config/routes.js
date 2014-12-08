app.config(['$httpProvider', '$routeProvider', '$locationProvider', function ($httpProvider, $routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $routeProvider
  .when('/', {
    controller: 'HomeController',
    templateUrl: './frontend/public/assets/views/home.html'
  })
  .when('/cadastro', {
    controller: 'CadastroController',
    templateUrl: './frontend/public/assets/views/cadastro.html'
  })
  .when('/404', {
    templateUrl: './frontend/public/assets/views/404.html'
  })
  .otherwise({ redirectTo: '/404' });

}]);