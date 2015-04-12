'use strict';

angular.module('spaceappApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('vote', {
        url: '/vote',
        templateUrl: 'app/vote/vote.html',
        controller: 'VoteCtrl'
      });
  });