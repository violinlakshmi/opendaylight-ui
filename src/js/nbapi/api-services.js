/*
    Keep API service here

    For information about the NB API please go to:
    https://wiki.opendaylight.org/view/OpenDaylight_Controller:REST_Reference_and_Authentication
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


opendaylight.factory('TopologySvc', ['NBApiSvc', 'SwitchSvc', function (NBApiSvc) {
  var svc = {
    base: function (container) {
      return NBApiSvc.base('topology', container)
    }
  };

  svc.topologyUrl = function (container) {
    return svc.base(container)
  }

  svc.userLinksUrl = function (container) {
    return svc.base(container).all('user-link');
  }

  svc.userLinkUrl = function (container, linkName) {
    return svc.base(container).one('user-link', linkName);
  }

  svc.getTopologyData = function (container, cb, eb) {
    TopologySvc.topologyUrl().getList().then(
      function(topologyData) {
        SwitchSvc.nodesUrl().getList().then(
          function(nodesProperties) {
          }
        )
      }
    )
  }

  return svc;
}]);