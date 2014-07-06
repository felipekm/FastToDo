/*global angular, console, confirm*/

angular.module("FastToDo").controller("aboutController", function HomeController($scope) {
    'use strict';
    
    $scope.back = function back() {
        $scope.goTo('/home');
    }
    
});