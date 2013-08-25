'use strict';

// Make sure to include the `ui.router` module as a dependency
angular.module('opendaylight', ['ui.router']).run(
  ['$rootScope', '$state', '$stateParams',
  function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
}]);


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
}]);