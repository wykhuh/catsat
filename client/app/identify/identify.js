'use strict';

angular.module('spaceappApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('identify', {
        url: '/identify',
        templateUrl: 'app/identify/identify.html',
        controller: 'IdentifyCtrl'
      });
  });