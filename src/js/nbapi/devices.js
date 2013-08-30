
opendaylight.factory('NodeSvc', ['Restangular', function (Restangular) {
    var svc = {
        'rest': Restangular
    };

    svc.getNodes = function (container) {
        return Restangular.all('switch/' + (container || 'default') + '/nodes').getList();
    }

    return svc
}]);

opendaylight.controller('DevicesCtrl', ['$scope', 'NodeSvc', function($scope, NodeSvc) {
    NodeSvc.getNodes().then(function(data) {
        $scope.properties = data;
    });
}]);

opendaylight.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('devices', {
        url: '/devices',
        templateUrl: 'partials/devices.html',
        controller: 'DevicesCtrl'
    });

}])