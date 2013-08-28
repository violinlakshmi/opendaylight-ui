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

    $stateProvider.state('about', {
        url: '/about',
        templateUrl: 'partials/about.html'
    });

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'partials/login.html',
        controller: 'LoginController'
    });

    $stateProvider.state('topology', {
        url: '/topology',
        templateUrl: 'partials/topology.html'
    });

}]);