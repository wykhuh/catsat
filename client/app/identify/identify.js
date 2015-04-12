'use strict';

angular.module('spaceappApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('identify', {
        url: '/',
        templateUrl: 'app/identify/identify.html',
        controller: 'IdentifyCtrl'
      });
  });