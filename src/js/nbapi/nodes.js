
opendaylight.factory('SwitchSvc', ['NBApiSvc', function (NBApiSvc) {
  var svc = {
    base: function(container) {
      return NBApiSvc.base('switch', container)
    }
  }

  // URL for nodes
  svc.nodesUrl = function (container) {
    return svc.base(container).all('nodes')
  }

  // URL for a node
  svc.nodeUrl = function(container, type, id) {
    return svc.base(container).one('node', type).one(id)
  }

  return svc
}]);

opendaylight.controller('NodesCtrl', ['$scope', 'SwitchSvc', function($scope, SwitchSvc) {
  $scope.ncpData = {}

  // Fetch the nodes then fetch more info about each node
  SwitchSvc.nodesUrl().getList().then(function(npData) {
    $scope.npData = npData.nodeProperties;

    angular.forEach(npData.nodeProperties, function (np) {
      SwitchSvc.nodeUrl(null, np.node.type, np.node.id).get().then(
        function(ncp, test) {
          $scope.ncpData[np.node.id] = ncp.nodeConnectorProperties
        }
      )
    })
    //$scope.properties = data;
  });
}]);

opendaylight.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('nodes', {
    url: '/nodes',
    templateUrl: 'partials/nodes.html',
    controller: 'NodesCtrl'
  });

  $stateProvider.state('nodes.details', {
    url: '/{nodeType}/{nodeId}',
    views: {
      '': {
        templateUrl: 'partials/nodes.details.html',
        controller: ['$scope', '$stateParams', function ($scope, $stateParams) {
        }]
      }
    }
  });
}])