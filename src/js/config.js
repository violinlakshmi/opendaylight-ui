'use strict';

var proto = 'http';
var host = 'localhost';
var port = '8080';
var path = '/v1';

angular.element(document).ready(function () {
        opendaylight.value('config', {
                endpoint : proto + '://' + host + '\\:' + port + path
            });
        angular.bootstrap(document, ['opendaylight']);
    });