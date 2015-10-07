(function() {
    'use strict';

    angular
        .module('ngAllow')
        .directive('allow', permission);

    permission.$inject = ['$rootScope', '$allowProvider'];

    function permission($rootScope, $allowProvider) {

        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {

            var prevDisp = element.css('display');

            function parsePermissionRef(ref) {

                var parsed = ref.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/);
                if (!parsed || parsed.length !== 4) {
                    throw new Error('Invalid permission ref "' + ref + '"');
                }

                return {
                    name: parsed[1],
                    payloadExpr: parsed[3] || null
                };
            }

            var permission = parsePermissionRef(attrs.allow);

            var update = function(val) {
                if (val) {
                    permission.payload = angular.copy(val);
                }

                var autorized = $allowProvider.authorize(permission.name, permission.payload);

                if (autorized) {
                    element.css('display', prevDisp);
                } else {
                    element.css('display', 'none');
                }
            };

            if (permission.payloadExpr) {
                scope.$watch(permission.payloadExpr, function(val) {
                    if (val !== permission.payload) {
                        update(val);
                    }
                }, true);

                permission.payload = angular.copy(scope.$eval(permission.payloadExpr));
            } else {
                permission.payload = {};
            }

            $rootScope.$on('$allow.refresh', function() {
                update();
            });

            update();
        }
    }

})();
