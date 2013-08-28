'use strict';


angular.module('opendaylight')
    .controller('LoginController', function ($scope, AuthenticationService, $location) {
        $scope.username = 'admin';
        $scope.password = 'admin';
        $scope.authed = AuthenticationService.isAuthed();

        $scope.doLogin = function() {
            AuthenticationService.doLogin($scope.username, $scope.password, $scope.loginSuccess, $scope.loginError);
        };

        $scope.loginSuccess = function (response) {
            console.log('change');
            $location.path('/')
        }

        $scope.loginError = function (response) {
        }
    });