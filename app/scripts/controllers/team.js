'use strict';

angular.module('aquagreensApp')
  .controller('TeamCtrl', ['$scope', 'getter', function ($scope, getter) {
    // Add an event listener.
    $scope.$on('dataLoaded', function(event, pageData) {
      console.log(pageData);
      $scope.page = pageData;
    });

    // Get data, and fire event when ready.
    getter.getData($scope, 'team');
  }]);
