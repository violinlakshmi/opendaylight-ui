'use strict';


angular.module('opendaylight')
    .controller('LoginController', function ($scope, AuthenticationService) {
        $scope.username = 'admin';
        $scope.password = 'admin';
        $scope.authed = AuthenticationService.isAuthed();

        $scope.doLogin = function() {
            AuthenticationService.doLogin($scope.username, $scope.password, $scope.loginSuccess, $scope.loginError);
        };

        $scope.loginSuccess = function (response) {

        }

        $scope.loginError = function (response) {
            debugger;
        }
    });