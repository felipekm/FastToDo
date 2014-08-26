/*globals angular, console, $ */

angular.module("FastToDo").controller("ToDoController", [
    "$scope", "$rootScope", "todoService", "$timeout",
    function ToDoController($scope, $rootScope, todoService, $timeout) {
        'use strict';

        $scope.toDo = {};
        $scope.toDoList = [];
        $scope.isLoading = false;

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
            $scope.isLoading = true;

            todoService.save($scope.toDo).then(
                function success(todoList) {
                    $scope.toDoList = todoList;
                    $scope.toDo = {};
                    $rootScope.goTo('/home');

                }
            );

            $scope.isLoading = false;
        };

        $scope.cancel = function cancel() {
            todoService.clearItem();
            $rootScope.goTo('/home');
        };

        function init() {
            $scope.toDo = todoService.getItem();
            $scope.isLoading = false;
            $('#txtToDoTitle').trigger('focus');
        }

        init();

    }
]);
