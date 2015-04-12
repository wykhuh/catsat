'use strict';

angular.module('spaceappApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });