'use strict';

var noAuthRoutes = ['/login'];

// Make sure to include the `ui.router` module as a dependency
var opendaylight = angular.module('opendaylight', ['ui.router']).run(
  ['$rootScope', '$state', '$stateParams', '$location', 'config', 'AuthService',
  function ($rootScope, $state, $stateParams, $location, config, AuthService) {

    // Set the state and stateParams on the $rootScope to make it available anywhere
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    // Make config always available
    $rootScope.config = config;

    // Authentication stuff. Taken partially from: http://arthur.gonigberg.com/2013/06/29/angularjs-role-based-auth/
    var isClean = function (route) {
        return _.find(noAuthRoutes,
          function (noAuthRoute) {
            return _.str.startsWith(route, noAuthRoute);
          }
        );
    };

    $rootScope.$on('$stateChangeStart', function (ev, to, toParams, from, fromParams) {
      if (!isClean($location.url()) && !AuthService.isAuthed()) {
        $location.path('/login');
      }
    });

    $rootScope.$watch(
      function () {
        return AuthService.isAuthed();
      },
      function (authed) {
        $rootScope.authed = authed;
      });
}])

// TODO: This should probably be changed to use broadcasts and present a user with a login form if auth is gone?
.config(function ($httpProvider) {
  var logsOutUserOn401 = ['$q', '$location', function ($q, $location) {
    var success = function (response) {
      return response;
    };

    var error = function (response) {
      if (response.status === 401) {
        //redirect them back to login page
        $location.path('/login');

        return $q.reject(response);
      }
      else {
        return $q.reject(response);
      }
    };

    return function (promise) {
      return promise.then(success, error);
    };
  }];

  $httpProvider.responseInterceptors.push(logsOutUserOn401);
});

