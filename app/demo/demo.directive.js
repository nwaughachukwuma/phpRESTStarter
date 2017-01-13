(function () {
    'use strict;'

    angular.module('bassoli.demo')
        .directive('demoSample', DemoDirective);

    function DemoDirective() {
        return {
            restrict: 'E',
            templateUrl: '/app/demo/demo.template.html',
            controller: 'DemoController',
            controllerAs: 'dc',
            bindToController: true
        }
    }
})();