/*global angular, console, confirm*/

angular.module("FastToDo").controller("AboutController", function AboutController ($scope) {
    'use strict';
    
    $scope.back = function back() {
        $scope.goTo('/home');
    }
    
});