angular.module('opendaylight')

.directive('stateIcon', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            stateValue: '@value'
        },
        template: '<span class="glyphicon glyphicon-{{stateIcon}}-sign"></span>',
        controller: function ($scope) {
            var icons = {
                1: 'ok',
                0: 'exclamation'
            }
            $scope.stateIcon = icons[$scope.stateValue]
        }

    }
})
.directive('portState', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            stateValue: '@value'
        },
        template: '<span ng-style="{color: stateColor}">{{stateString}}</span>',
        controller: function ($scope) {
            var states = {0: 'DOWN', 1: 'UP'};
            var colors = {0: 'red', 1: 'green'};

            $scope.stateString = states[$scope.stateValue];
            $scope.stateColor = colors[$scope.stateValue];
        }
    }
})