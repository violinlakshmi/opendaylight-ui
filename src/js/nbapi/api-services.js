/*
    Keep API service here
*/

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


opendaylight.factory('TopologySvc', ['Restangular', function (Restangular) {
  var svc = {
    'rest': Restangular
  };

  return svc
}]);