'use strict';

/*
NOTE: Configure these values before doing any grunt task to build the application javascript.
These are available from the root scope and elsewhere.
*/
var proto = 'http';
var host = '15.185.101.203';
var port = '8080';
var path = '/controller/nb';

angular.element(document).ready(function () {
        opendaylight.value('config', {
                endpoint : proto + '://' + host + ':' + port + path
            });
        angular.bootstrap(document, ['opendaylight']);
    });