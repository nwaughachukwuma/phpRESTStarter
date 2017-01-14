(function () {
    'use strict;'

    angular.module('bassoli.core')
        .config(['$translateProvider', coreConfig]);

    function coreConfig($translateProvider) {
        
        // UI translations configuration
        $translateProvider.translations('en', ui_string_en);
        $translateProvider.translations('it', ui_string_it);

        $translateProvider.preferredLanguage('it');
    }
})();