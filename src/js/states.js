'use strict';

angular.module('opendaylight').config(
  ['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
      .otherwise('/');

    $stateProvider.state('index', {
        url: '/',
        templateUrl: 'index.html'
    });

    $stateProvider.state('help', {
        url: '/help',
    });

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'partials/login.html',
        controller: 'LoginController'
    });

}]);