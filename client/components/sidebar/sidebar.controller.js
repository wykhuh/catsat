'use strict';

angular.module('spaceappApp')
  .controller('SideBarCtrl', function ($scope, $location, Auth) {

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });