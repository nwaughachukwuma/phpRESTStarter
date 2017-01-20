(function () {
    'use strict;'

    angular.module('project.demo')
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