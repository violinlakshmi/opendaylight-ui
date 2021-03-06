'use strict';

angular.module('opendaylight').config(
  ['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
      .otherwise('/index');

    $stateProvider.state('index', {
        url: '/index',
        templateUrl: 'partials/index.html'
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

    $stateProvider.state('logout', {
        url: '/logout',
        controller: 'LogoutController'
    })
}]);