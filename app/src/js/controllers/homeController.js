/*global angular, console, confirm, $*/

angular.module("FastToDo").controller("HomeController", [
    "$scope", "$http", "$rootScope", 'todoService', function HomeController($scope, $http, $rootScope, todoService) {

        'use strict';

        $scope.modelTodo = {
            id: 0,
            title: null,
            description : null,
            creationDate : null
        };

        $scope.headerTitle = "Fast ToDo";

        $scope.isTitleRemainingVisible = false;
        $scope.isDescriptionRemainingVisible = false;

        $scope.showRemaining = function showRemaining(type) {
            if (type === 'title') {
                $scope.isTitleRemainingVisible = !$scope.isTitleRemainingVisible;
            } else {
                $scope.isDescriptionRemainingVisible = !$scope.isDescriptionRemainingVisible;
            }
        };

        $scope.isAddMode = function isAddMode() {
            return $rootScope.isAddMode;
        };

        $scope.about = function about() {
            $scope.goTo('/about');
        };

        $scope.details = function details(todo) {
            todoService.setItem(todo);
            $scope.goTo('/todo');
        };

        $scope.isDeleteMode = function isDeleteMode() {
            return $rootScope.isDeleteMode;
        };

        $scope.openAdd = function openAdd() {
            $rootScope.isAddMode = !$rootScope.isAddMode;
        };

        $scope.openDelete = function openDelete() {
            $rootScope.isDeleteMode = true;
        };

        $scope.itemsToBeDone = function itemsToBeDone() {
            var count = 0, i;
            for (i in $scope.todoList) {
                if ($scope.todoList[i].isDone === false) {
                    count += 1;
                }
            }
            return count;
        };

        $scope.swipeItemToRight = function swipeItemToRight(todoId) {
            $('#todoItem_' + todoId).animate({
                right: '0px',
                left : '90px'
            }, 200).addClass('opened');
        };

        $scope.swipeItemToLeft = function swipeItemToLeft(todoId) {
            $('#todoItem_' + todoId).animate({
                right: '90px',
                left : '0px'
            }, 200).removeClass('opened');
        };

        $scope.cancelItem = function cancelItem() {
            $scope.modelTodo = {};
            $rootScope.isAddMode = false;
            $scope.headerTitle = "Fast ToDo";
            return;
        };

        $scope.saveNewItem = function saveNewItem() {
            $rootScope.isAddMode = false;

            if ($scope.modelTodo.title) {
                $scope.modelTodo.id = $scope.todoList.length === 0 ? 1 : $scope.todoList.length + 1;
                $scope.modelTodo.isDone = false;

                var today = new Date(),
                    options = {
                        month: "long"
                    },
                    month = today.toLocaleString("en-US", options).toUpperCase();

                $scope.modelTodo.creationDate = {
                    day : today.getDate(),
                    month : month.slice(0, 3)
                };

                if ($scope.modelTodo.id !== 0) {
                    $scope.todoList.push($scope.modelTodo);
                    todoService.saveList($scope.todoList).then(
                        function (data) {
                            $scope.todoList = data;
                        },
                        function (reason) {
                            console.log('[ERROR] - ' + reason);
                            $scope.todoList = todoService.getAll();
                        }
                    );

                    $scope.modelTodo = {
                        id: 0,
                        description : null,
                        isDone: false,
                        creationDate : {
                            day : null,
                            month : null,
                            year : null
                        }
                    };
                }
            }
        };

        $scope.removeItem = function removeItem(todoId) {
            todoService.remove(todoId).then(
                function (data) {
                    $scope.todoList = data || [];
                },
                function (reason) {
                    console.log('[ERROR] - ' + reason);
                    $scope.todoList = todoService.getAll();
                }
            );
        };

        $scope.deleteAll = function deleteAll() {
            if (confirm('Are you sure to Delete All Items?')) {
                todoService.clear().then(
                    function success(data) {
                        $scope.todoList = data;
                    },
                    function error(reason) {
                        console.log('[ERROR] - ' + reason);
                        $scope.todoList = todoService.getAll();
                    }
                );
            }
        };

        $scope.doneItem = function doneItem(todo) {
            todoService.done(todo);
            $scope.todoList = todoService.getAll() || [];
        };

        $scope.closeDelete = function closeDelete() {
            if (confirm('Are you sure?')) {
                todoService.clear();
            }

            $scope.todoList = [];

            $rootScope.isDeleteMode = false;
        };

        $scope.cancel = function cancel() {
            $rootScope.isAddMode = false;
            $scope.modelTodo = {};
        };

        // disabling animate
        $scope.disableHeaderBack();
        $scope.disableAnimate();

        function init() {
            $scope.todoList = todoService.getAll() || [];
        }

        init();

    }]);