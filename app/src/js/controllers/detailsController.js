/*global angular, console, confirm*/

angular.module("FastToDo").controller("detailsController", function ($scope) {
    'use strict';

    $scope.about = function about() {
        $scope.goTo('/about');
    };

    $scope.back = function back() {
        $scope.goTo('/home');
    };

});
