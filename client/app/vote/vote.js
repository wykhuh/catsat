'use strict';

angular.module('spaceappApp')
  .config(function ($stateProvider) {
    $stateProvider

      .state('newest', {
        url: '/vote/newest',
        templateUrl: 'app/vote/newest.html',
        controller: 'VoteNewestCtrl'
      })

      .state('mostvotes', {
        url: '/vote/mostvotes',
        templateUrl: 'app/vote/mostVotes.html',
        controller: 'VoteNewestCtrl'
      })

      .state('vote', {
        url: '/vote',
        templateUrl: 'app/vote/vote.html',
        controller: 'VoteCtrl'
      });
  });