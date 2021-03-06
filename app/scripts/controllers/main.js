'use strict';

angular.module('aquagreensApp')
  .controller('MainCtrl', ['$scope', '$location', function ($scope, $location) {
    // Check for page load.
    $scope.$on('$routeChangeSuccess', function() {
      // Trim first char.
      $scope.path = $location.path().substring(1);
    });
  }]);
