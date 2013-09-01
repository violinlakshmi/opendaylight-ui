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
    template: '<ui-view></ui-view>',
    abstract: true
  })

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

  // List flow details
  $stateProvider.state('flows.details', {
    url: '/{nodeType}/{nodeId}/{flowName}',
    views: {
      '': {
        templateUrl: 'partials/flows.details.html',
        controller: ['$scope', 'FlowSvc', function ($scope, FlowSvc) {
          $scope.installed = 1;
          FlowSvc.nodeFlowUrl(null, $scope.$stateParams.nodeType, $scope.$stateParams.nodeId, $scope.$stateParams.flowName).get().then(
            function (data) {
              $scope.flow = data;
            }
          )
        }]
      }
    }
  });
}])