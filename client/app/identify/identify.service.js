'use strict';

angular.module('spaceappApp')
  .factory('identifyFactory', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    $http.defaults.useXDomain = true;

    var identify = function(data) {
      console.log('inside', data)
      return $http({
        method: 'POST',
        url: 'http://catsat-api.herokuapp.com/api/catsat_locations',
        data: data
      });
    };


    var getNewest = function(data) {
      console.log('inside', data)
      return $http({
        method: 'GET',
        url: 'http://catsat-api.herokuapp.com/api/catsat_locations/newest'
      });
    };

    return {
      identify: identify
    };

  });
