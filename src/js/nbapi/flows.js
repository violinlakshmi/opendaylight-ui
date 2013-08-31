opendaylight.factory('FlowSvc', ['NBApiSvc', function (NBApiSvc) {
  var svc = {
    base: function(container) {
      return NBApiSvc.base('flow', container)
    }
  }

  svc.flowsUrl = function (container) {
    return svc.base(container)
  }

  svc.nodeFlowsUrl = function(container, nodeType, nodeId) {
    return svc.base(container).one('node', nodeType).one(nodeId)
  }

  svc.nodeStaticFlowsUrl = function(container, nodeType, nodeId, name) {
    return svc.base(container).one('node', nodeType).one(nodeId).one(name)
  }

  return svc
}]);

opendaylight.controller('FlowsCtrl', ['$scope', 'FlowSvc', function ($scope, FlowSvc) {
}])

opendaylight.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state('flows', {
    url: '/flows',
    templateUrl: 'partials/flows.html',
    abstract: true
  })

  $stateProvider.state('flows.details', {
    url: '/{nodeType}/{nodeId}',
    views: {
      '': {
        templateUrl: 'partials/flows.details.html',
        controller: ['$scope', 'FlowSvc', 'Restangular', function ($scope, FlowSvc, Restangular) {
          var req = FlowSvc.nodeFlowsUrl('default', $scope.$stateParams.nodeType, $scope.$stateParams.nodeId);
          $scope.flows = req.getList()
        }]
      }
    }
  });

  $stateProvider.state('flows.details.edit', {
    url: '/edit',
    views: {
      '': {
        templateUrl: 'partials/flows.edit.html',
        controller: ['$scope', 'FlowSvc', function ($scope, FlowSvc) {
          //console.log($scope.flows)
        }]
      }
    }
  });
}])