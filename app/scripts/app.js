'use strict';

angular.module('aquagreensApp', [
  'getter.directives',
  'LocalStorageModule',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/products', {
        templateUrl: 'views/products.html',
        controller: 'ProductsCtrl'
      })
      .when('/sustainability', {
        templateUrl: 'views/sustainability.html',
        controller: 'SustainabilityCtrl'
      })
      .when('/team', {
        templateUrl: 'views/team.html',
        controller: 'TeamCtrl'
      })
      .otherwise({
        redirectTo: '/products'
      });
  });
