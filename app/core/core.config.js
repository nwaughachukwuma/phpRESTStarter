(function () {
    'use strict;'

    angular.module('bassoli.core')
        .config(['$translateProvider', coreConfig]);

    function coreConfig($translateProvider) {
        
        // UI translations configuration
        $translateProvider.translations('en', {});
        $translateProvider.translations('it', {});

        $translateProvider.preferredLanguage('it');
    }
})();