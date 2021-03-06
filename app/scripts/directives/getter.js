'use strict';

angular.module('getter.directives', [])
  .filter('object2Array', function() {
    return function(input) {
      var out = [];
      for(var i in input){
        out.push(input[i]);
      }
      return out;
    };
  })
  .factory('getter', ['$http', 'localStorageService', function ($http, localStorageService) {
    return {
      getData: function($scope, type) {
        // Check for a type.
        if (type === undefined) {
          console.warn('type == undefined | You\'re trying to get data, but haven\'t defined what type.');
          return;
        }

        // Set global vars.
        var pageData;

        //debugger;

        // Set config object, with urls and parsers.
        var config = {
          'products': {
            'url': 'http://aquagreens.ca/_drupal/api/products.jsonp?callback=JSON_CALLBACK',
            'parser': function(data) {
              for (var i = data.length - 1; i >= 0; i--) {
                // Check for empty images.
                if (typeof data[i].thumbnail !== 'string') {
                  data[i].thumbnail = '';
                }
                if (typeof data[i].image !== 'string') {
                  data[i].image = '';
                }
              }

              // Pop first to feature it.
              var featured = data[0];
              data.shift();

              // Create indexed object.
              var boxes = {};
              for (i = data.length - 1; i >= 0; i--) {
                var path = data[i].title.toLowerCase().trim().replace(' ', '-');
                data[i].path = path;
                data[i].num = i;
                boxes[path + ''] = data[i];
              }

              // Reset pageData object, then set it up.
              pageData = {};
              pageData.boxes = boxes;
              pageData.featured = featured;
              // Then return it.
              return pageData;
            }
          },
          'sustainability': {
            'url': 'http://aquagreens.ca/_drupal/api/sustainability.jsonp?callback=JSON_CALLBACK',
            'parser': function(data) {
              // Reset pageData object, then set it up.
              pageData = {};
              pageData = data[0];
              pageData.vimeo = 'http://player.vimeo.com/video/' + pageData.vimeo;

              // Then return it.
              return pageData;
            }
          },
          'team': {
            'url': 'http://aquagreens.ca/_drupal/api/team.jsonp?callback=JSON_CALLBACK',
            'parser': function(data) {
              // Reset pageData object, then set it up.
              pageData = {};
              pageData = data[0];
              // Then return it.
              return pageData;
            }
          }
        };

        // Get the data from json.
        var getJson = function () {
          $http.jsonp(config[type].url)
            .success(function(data) {
              // Parse the data.
              pageData = config[type].parser(data);

              // Compare to cached, and set if needed.
              var cachedPageData = localStorageService.get(type);

              if (JSON.stringify(cachedPageData) !== JSON.stringify(pageData)) {
                localStorageService.add(type, pageData);
                $scope.$emit('dataLoaded', pageData);
              }
            });
        };

        // Try to get/set pageData.
        if (!localStorageService.get(type)) {
          // If no cookie data, retrieve it and set it.
          getJson();
        }
        else {
          // Get data from cookie.
          pageData = localStorageService.get(type);
          $scope.$emit('dataLoaded', pageData);
          getJson();
        }
      }
    };
  }]
);
