(function () {
    'use strict;'

    angular.module('bassoli.demo')
        .controller('DemoController', ['DemoService', DemoController]);

    function DemoController(DemoService) {
        var self = this;
        self.dummy = 'angularjs';
        self.customers = [];

        function activate() {
            DemoService.Get()
                .then(function (result) {
                    if (result.status === 200) {
                        if (typeof (result.data) !== 'object') {
                            throw 'Invalid response: ' + result.data;
                        }
                        else {
                            self.customers = result.data;
                        }
                    }
                })
                .catch(function (error) {
                    console.error(error);
                    alert('Error:' + error);
                });
        }
        activate();
    }
})();