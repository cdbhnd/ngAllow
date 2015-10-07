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

        vm.vehicles = [{
            name: 'DeathStar',
            type: 'ship',
            owner: 'Empire'
        }, {
            name: 'X-WING STARFIGHTER',
            type: 'ship',
            owner: 'Rebel Aliance'
        }, {
            name: 'AT-ST WALKER',
            type: 'walker',
            owner: 'Empire'
        }, {
            name: 'AAT BATTLE TANK',
            type: 'tank',
            owner: 'Empire'
        }, {
            name: 'SNOWSPEEDER',
            type: 'ship',
            owner: 'Rebel Aliance'
        }];
    }

    angular
        .module('StarWars')
        .factory('forceContext', forceContext);

    forceContext.$inject = ['$rootScope'];

    function forceContext($rootScope) {

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

            $rootScope.$emit('$allow.refresh');
        }

        function setSith() {
            context.current = {
                name: 'Dart Wader',
                role: 'Sith'
            };

            $rootScope.$emit('$allow.refresh');
        }

        function clear() {
            context.current = null;

            $rootScope.$emit('$allow.refresh');
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

        $allowProvider.registerRole('soldier-driver', function(payload) {

            if (!forceContext.current) {
                return false;
            }

            if (forceContext.current.role === 'Jedi' && payload.vehicle.owner === 'Rebel Aliance') {
                return true;
            }

            if (forceContext.current.role === 'Sith' && payload.vehicle.owner === 'Empire') {
                return true;
            }
        });

        $allowProvider.registerRole('unknown', function(payload) {

            if (!forceContext.current) {
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

        $allowProvider.registerPermission('bright-side-of-the-force', ['jedi']);
        $allowProvider.registerPermission('dark-side-of-the-force', ['sith']);
        $allowProvider.registerPermission('can-drive', ['soldier-driver', 'unknown']);

    }]);

})();
