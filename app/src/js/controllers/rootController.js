/*global angular*/

angular.module("FastToDo").controller("rootController", ["$rootScope", "$scope", "$location", "$timeout", "fasttodo.config", "storageFactory", "$window",
    function RootController($rootScope, $scope, $location, $timeout, firetodoConfig, storageFactory, $window) {
        'use strict';

        $scope.isLayoutAnimated = false;
        $scope.isHeaderBackAllowed = false;
        $scope.isAddMode = false;
        $scope.isDeleteMode = false;
        
        $rootScope.config = firetodoConfig;
        
        $scope.goBack = function () {
            $window.history.back();
        };
        
        $rootScope.goTo = function goTo(uri) {
            $timeout(function goToLocation() {
                $location.path(uri);
            }, 0);
        };
        
        $rootScope.enableAnimate = function rootEnableAnimate() {
            $scope.isLayoutAnimated = true;
        };
        
        $rootScope.disableAnimate = function rootDisableAnimate() {
            $scope.isLayoutAnimated = false;
        };
        
        $rootScope.enableHeaderBack = function rootEnableHeader() {
            $scope.isHeaderBackAllowed = true;
            $scope.headerClass = 'half';
        };
        
        $rootScope.disableHeaderBack = function rootDisableHeader() {
            $scope.isHeaderBackAllowed = false;
            $scope.headerClass = 'full';
        };

        $rootScope.session = storageFactory('sessionStorage');
        $rootScope.storage = storageFactory('localStorage');
}]);