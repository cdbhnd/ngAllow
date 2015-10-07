(function() {
    'use strict';

    angular
        .module('ngAllow')
        .factory('$allowProvider', factory);

    function factory() {

        return new AllowProvider();
    }

    function AllowProvider() {

        this.roles = {};
        this.permissions = {};
    }

    AllowProvider.prototype.registerRole = function(name, grantFn) {

        this.roles[name] = {
            grant: grantFn
        };
    };

    AllowProvider.prototype.registerPermission = function(name, roles) {

        this.permissions[name] = {
            roles: roles
        };
    };

    AllowProvider.prototype.authorize = function(permissionName, payload) {

        var that = this;

        var permission = this.permissions[permissionName];

        var authorized = false;

        angular.forEach(permission.roles, function(role) {
            if (that.roles[role].grant(payload)) {
                authorized = true;
            }
        });

        return authorized;
    };
})();
