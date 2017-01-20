(function () {
    'use strict;'

    angular.module('project.demo')
        .service('DemoService', ['$http', DemoService]);
    
    function DemoService($http) {

        var service = {
            Get: get
        };

        function get() {
            return $http.get('http://localhost:86/api/sample');
        }

        return service;
    }
})();