'use strict';

angular.module('aquagreensApp')
.controller('ProductsCtrl', ['$scope', '$location', '$anchorScroll', 'getter', function ($scope, $location, $anchorScroll, getter) {
    // Add an event listener for data load.
    $scope.$on('dataLoaded', function(event, pageData) {
      $scope.page = pageData;
    });

    // Get data, and fire event when ready.
    getter.getData($scope, 'products');

    // Add functionality to switch
    $scope.switchFeatured = function(index, $event) {
      if ($scope.page.boxes[index].type === 'product') {
        $scope.page.featured = $scope.page.boxes[index];

        // Scroll to top.
        $anchorScroll();
      }
    };
  }]);
