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
            var stateValue = $scope.stateValue;

            var icons = {1: 'ok', 0: 'exclamation'};
            var textStates = {'true': 1, 'false': 0}
            if (!stateValue.match('^[0-9]$')) {
                stateValue = textStates[stateValue];
            }
            console.log(stateValue)
            $scope.stateIcon = icons[stateValue]
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