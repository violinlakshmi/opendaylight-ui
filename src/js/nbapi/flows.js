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

  svc.nodeFlowUrl = function(container, nodeType, nodeId, name) {
    return svc.base(container).one('node', nodeType).one(nodeId).one('static-flow', name)
  }

  return svc
}]);

opendaylight.controller('FlowsCtrl', ['$scope', 'FlowSvc', function ($scope, FlowSvc) {
}])

opendaylight.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state('flows', {
    url: '/flows',
    templateUrl: 'partials/flows.html',
    //template: '<ui-view></ui-view>',
    abstract: true
  })



  // List all flows - independant of node.
  $stateProvider.state('flows.list', {
    url: '/list',
    views: {
      '': {
        templateUrl: 'partials/flows.list.html',
        controller: ['$scope', 'FlowSvc', function ($scope, FlowSvc) {
          FlowSvc.flowsUrl().getList().then(function (data) {
            $scope.flows = data.flowConfig;
          })
        }]
      }
    }
  });

  $stateProvider.state('flows.create', {
    url: '/create',
    views: {
      '': {
        templateUrl: 'partials/flows.create.html',
        controller: ['$scope', 'FlowSvc', 'SwitchSvc', function ($scope, FlowSvc, SwitchSvc) {
          $scope.nodes = SwitchSvc.nodesUrl().getList();

          // The current select nodes properties
          $scope.selectNode = function() {
            var node = $scope.nodeString.split('/');
            $scope.ncpData = SwitchSvc.nodeUrl(null, node[0], node[1]).get();
          }
        }]
      }
    }
  })

  // List the flows on a node
  $stateProvider.state('flows.node', {
    url: '/{nodeType}/{nodeId}',
    views: {
      '': {
        templateUrl: 'partials/flows.node.html',
        controller: ['$scope', 'FlowSvc', function ($scope, FlowSvc) {
          FlowSvc.nodeFlowsUrl('default', $scope.$stateParams.nodeType, $scope.$stateParams.nodeId).getList().then(
            function (data) {
              $scope.flows = data.flowConfig;
            }
          )
        }]
      }
    }
  });

  // Show details
  $stateProvider.state('flows.details', {
    url: '/{nodeType}/{nodeId}/{flowName}',
    views: {
      '': {
        templateUrl: 'partials/flows.details.html',
        controller: ['$scope', 'FlowSvc', function ($scope, FlowSvc) {
          FlowSvc.nodeFlowUrl(null, $scope.$stateParams.nodeType, $scope.$stateParams.nodeId, $scope.$stateParams.flowName).get().then(
            function (data) {
              $scope.flow = data;
            }
          )
        }]
      }
    }
  });

  // Edit state which uses the '' view in flows.details
  $stateProvider.state('flows.details.edit', {
    url: '/edit',
    views: {
      '@flows.details': {
        templateUrl: 'partials/flows.edit.html',
        controller: ['$scope', 'FlowSvc', function ($scope, FlowSvc) {
        }]
      }
    }
  });
}])