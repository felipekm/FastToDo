/*globals angular, console */

angular.module("FastToDo").controller("ToDoController", [
    "$scope", "$rootScope", "todoService",
    function ToDoController($scope, $rootScope, todoService) {

        'use strict';

        $rootScope.headerTitle = "New Item";

        $scope.toDo = {
            id: 0,
            description : null,
            isDone: false,
            creationDate : {
                day : null,
                month : null,
                year : null
            }
        };

        $scope.toDoList = [{}];

        $scope.isTitleRemainingVisible = false;
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
            $rootScope.goTo('/home');
        };

        $scope.cancel = function cancel() {
            $scope.toDo = {
                id: 0,
                description : null,
                isDone: false,
                creationDate : {
                    day : null,
                    month : null,
                    year : null
                }
            };

            $rootScope.goTo('/home');
        };

        function init() {
            $scope.toDo = todoService.getItem();
        }

        init();

    }
]);