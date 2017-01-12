(function () {
    'use strict;'

    angular.module('bassoli', [])
        .controller('MainController', ['DemoService', MainController])
        .factory('DemoService', ['$http', DemoService]);

    function MainController(DemoService) {
        var self = this;

        self.dummy = 'angularjs';
        self.customers = [];

        function activate() {
            DemoService.Get()
                .then(function (result) {
                    if (result.status === 200) {
                        self.customers = result.data;
                    }
                })
                .catch(function (error) {
                    alert(error);
                });
        }

        activate();
    }

    
    function DemoService($http) {

        var service = {
            Get: get
        };

        function get() {
            return $http.get('http://localhost:85/api/customers');
        }

        return service;
    }

})();
