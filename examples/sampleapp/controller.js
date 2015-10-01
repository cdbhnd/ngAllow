(function() {
    'use strict';

    angular
        .module('sample')
        .controller('SampleController', SampleController);

    function SampleController() {
        var vm = this;
        vm.title = 'Controller';

        activate();

        ////////////////

        function activate() {}
    }
})();
