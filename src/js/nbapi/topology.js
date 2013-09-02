opendaylight.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('topology', {
    url: '/topology',
    templateUrl: 'partials/topology.html',
    controller: ['$scope', 'TopologySvc', 'SwitchSvc', function ($scope, TopologySvc, SwitchSvc) {
      $scope.createTopologyData = function() {

      }
    }]
  });

}])