'use strict';

angular.module('aquagreensApp')
  .controller('SustainabilityCtrl', ['$scope', '$http', '$sce', 'getter', function ($scope, $http, $sce, getter) {
    // Add an event listener.
    $scope.$on('dataLoaded', function(event, pageData) {
      // Set vimeo URL as a trusted resource.
      pageData.vimeo = $sce.trustAsResourceUrl(pageData.vimeo);
      $scope.page = pageData;
    });

    // Get data, and fire event when ready.
    getter.getData($scope, 'sustainability');
  }]);
