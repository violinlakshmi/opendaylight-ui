
opendaylight.factory('TopologySvc', ['Restangular', function (Restangular) {
    var svc = {
        'rest': Restangular
    };

    return svc
}]);

opendaylight.controller('TopologyCtrl', ['$scope', 'TopologySvc', function($scope, TopologySvc) {
    $scope.topology = TopologySvc.rest.all('topology/default').getList()
}]);

opendaylight.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('topology', {
        url: '/topology',
        templateUrl: 'partials/topology.html',
        controller: 'TopologyCtrl'
    });

}])