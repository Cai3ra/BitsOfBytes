novaOpcaoApp.config(['$httpProvider', '$routeProvider', '$locationProvider', function ($httpProvider, $routeProvider, $locationProvider) {
  // $locationProvider.html5Mode(true).hashPrefix('!');
  $routeProvider
  .when('/', {
    controller: 'HomeController',
    templateUrl: './assets/views/home.html'
  })
  .when('/404', {
    templateUrl: './assets/views/404.html'
  })
  .otherwise({ redirectTo: '/404' });

}]);