(function () {
    'use strict;'

    angular.module('bassoli.demo')
        .controller('DemoController', ['DemoService', MainController]);

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
})();