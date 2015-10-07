(function() {
    'use strict';

    var app = angular
        .module('StarWars', [
            'ngAllow'
        ]);

    angular
        .module('StarWars')
        .controller('BattlefieldController', BattlefieldController);

    BattlefieldController.$inject = ['forceContext'];

    function BattlefieldController(forceContext) {
        var vm = this;
        vm.context = forceContext;
    }

    angular
        .module('StarWars')
        .factory('forceContext', forceContext);

    function forceContext() {

        var context = {
            current: null,
            setJedi: setJedi,
            setSith: setSith,
            clear: clear
        };

        return context;

        function setJedi() {
            context.current = {
                name: 'Luke Skywalker',
                role: 'Jedi'
            };
        }

        function setSith() {
            context.current = {
                name: 'Dart Wader',
                role: 'Sith'
            };
        }

        function clear() {
            context.current = null;
        }
    }

    app.run(['$allowProvider', 'forceContext', function($allowProvider, forceContext) {

        $allowProvider.registerRole('jedi', function() {

            if (!forceContext.current) {
                return false;
            }

            if (forceContext.current.role === 'Jedi') {
                return true;
            }

            return false;
        });

        $allowProvider.registerRole('sith', function() {

            if (!forceContext.current) {
                return false;
            }

            if (forceContext.current.role === 'Sith') {
                return true;
            }

            return false;
        });

        $allowProvider.registerPermission('brightSideOfTheForce', ['jedi']);
        $allowProvider.registerPermission('darkSideOfTheForce', ['sith']);

    }]);

})();
