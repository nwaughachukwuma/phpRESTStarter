(function () {
    'use strict;'

    angular.module('bassoli.demo')
        .service('DemoService', ['$http', DemoService]);
    
    function DemoService($http) {

        var service = {
            Get: get
        };

        function get() {
            return $http.get('http://localhost:85/api/sample');
        }

        return service;
    }
})();