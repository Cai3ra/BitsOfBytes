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