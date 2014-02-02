'use strict';

angular.module('aquagreensApp')
.controller('ProductsCtrl', ['$scope', '$routeParams', 'getter', function ($scope, $routeParams, getter) {
    // Add an event listener.
    $scope.$on('dataLoaded', function(event, pageData) {
      $scope.page = pageData;
    });

    // Get data, and fire event when ready.
    getter.getData($scope, 'products');

    // Add functionality to switch
    $scope.switchFeatured = function(index) {
      if ($scope.page.boxes[index].type === 'product') {
        $scope.page.featured = $scope.page.boxes[index];
      }
    };
  }]);
