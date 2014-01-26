'use strict';

angular.module('aquagreensApp')
  .controller('SustainabilityCtrl', ['$scope', '$http', 'getter', function ($scope, $http, getter) {
    // Add an event listener.
    $scope.$on('dataLoaded', function(event, pageData) {
      $scope.page = pageData;
    });

    // Get data, and fire event when ready.
    getter.getData($scope, 'sustainability');
  }]);
