/*global angular, console, confirm*/

angular.module("FastToDo").controller("aboutController", function ($scope) {
    'use strict';
    
    $scope.back = function back() {
        $scope.goTo('/home');
    }
    
});