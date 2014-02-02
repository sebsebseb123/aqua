'use strict';

angular.module('aquagreensApp')
  .controller('ProductsCtrl', ['$scope', 'getter', function ($scope, getter) {
    // Add an event listener.
    $scope.$on('dataLoaded', function(event, pageData) {
      console.log(pageData);
      $scope.page = pageData;
    });

    // Get data, and fire event when ready.
    getter.getData($scope, 'products');

    // Add functionality to switch
    $scope.switchFeatured = function(index) {
      $scope.page.featured = $scope.page.boxes[index];
    }
  }]);
