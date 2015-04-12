'use strict';

angular.module('spaceappApp')
  .factory('api', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    $http.defaults.useXDomain = true;

    var createLocation = function(data) {
      console.log('createLocation', data)
      return $http({
        method: 'POST',
        url: 'http://catsat-api.herokuapp.com/api/catsat_locations',
        data: data
      });
    };


    var getLocations = function() {
      console.log('createLocation')
      return $http({
        method: 'GET',
        url: 'http://catsat-api.herokuapp.com/api/catsat_locations'
      });
    };

    var getNewest = function() {
      console.log('getNewest')
      return $http({
        method: 'GET',
        url: 'http://catsat-api.herokuapp.com/api/catsat_locations/newest'
      });
    };

    var getTopVotes = function() {
      console.log('getTopVotes')
      return $http({
        method: 'GET',
        url: 'http://catsat-api.herokuapp.com/api/catsat_locations/votes'
      });
    };

    var getLocationsByTag = function(tag) {
      console.log('getLocationsByTag', tag)
      return $http({
        method: 'GET',
        url: 'http://catsat-api.herokuapp.com/api/catsat_locations/'+ tag
      });
    };

    var castVote = function(data){
      console.log('castVote', data);
    };

    return {
      createLocation: createLocation,
      getLocations: getLocations,
      getNewest: getNewest,
      getTopVotes: getTopVotes,
      getLocationsByTag: getLocationsByTag,
      castVote: castVote
    };

  });
