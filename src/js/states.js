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

    $stateProvider.state('help', {
        url: '/help',
        templateUrl: 'partials/help.html'
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

    $stateProvider.state('flows', {
        url: '/flows',
        templateUrl: 'partials/flows.html'
    });

    $stateProvider.state('devices', {
        url: '/devices',
        templateUrl: 'partials/devices.html'
    });

    $stateProvider.state('topology', {
        url: '/topology',
        templateUrl: 'partials/topology.html'
    });

}]);