/*globals angular, console, $ */

angular.module("FastToDo").controller("ToDoController", [
    "$scope", "$rootScope", "todoService",
    function ToDoController($scope, $rootScope, todoService) {
        'use strict';

        $scope.toDo = {};
        $scope.toDoList = [];

        $scope.isTitleRemainingVisible = true;
        $scope.isDescriptionRemainingVisible = false;

        $scope.showRemaining = function showRemaining(type) {
            if (type === 'title') {
                $scope.isTitleRemainingVisible = !$scope.isTitleRemainingVisible;
            } else {
                $scope.isDescriptionRemainingVisible = !$scope.isDescriptionRemainingVisible;
            }
        };

        $scope.save = function save() {
            todoService.save($scope.toDo);
            $scope.toDo = {};
            $rootScope.goTo('/home');
        };

        $scope.cancel = function cancel() {
            todoService.clearItem();
            $rootScope.goTo('/home');
        };

        function init() {
            $scope.toDo = todoService.getItem();
            $('#txtToDoTitle').trigger('focus');
        }

        init();

    }
]);
