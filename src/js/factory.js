'use strict';

/*
Anything that doesn't go into a seperate file (as in is deemed too big for here) goes here.

Examples: Auth logic
*/

opendaylight.factory('NBApiSvc', ['Restangular', function (Restangular) {
  var svc = {};

  svc.base = function(nbName, container) {
    var container = container || 'default';
    return Restangular.one(nbName, container);
  }

  return svc
}])

opendaylight.factory('NBApiStatSvc', ['$http', 'config', function ($http, config) {
  var svc = {};

  svc.check = function (cb) {
  	$http.get(config.endpoint_base).success(function (resp) {cb()})
  }
  return svc;
}])

opendaylight.factory('UserService', function () {
  var user = null;
  var userRoles = [];

  var factory = {};

  return factory
});