/*global angular, console, confirm, $*/

angular.module("FastToDo").controller("HomeController", [
    "$scope", "$http", "$rootScope", 'todoService', function HomeController($scope, $http, $rootScope, todoService) {

        'use strict';

        $scope.modelTodo = {};
        $scope.todoList = {};

        $scope.about = function about() {
            $scope.goTo('/about');
        };

        $scope.getDetails = function getDetails(todo) {
            todoService.setItem(todo);
            $scope.goTo('/todo');
        };

        $scope.addNewItem = function addNewItem() {
            $scope.goTo('/todo');
        };

        $scope.itemsToBeDone = function itemsToBeDone() {
            var count = 0, i;
            return $scope.todoList.length;
        };

        $scope.swipeItemToRight = function swipeItemToRight(todoId) {
            $('#todoItem_' + todoId).animate({
                right: '0px',
                left : '90px'
            }, 200);
        };

        $scope.swipeItemToLeft = function swipeItemToLeft(todoId) {
            $('#todoItem_' + todoId).animate({
                right: '90px',
                left : '0px'
            }, 200);
        };

        $scope.removeAll = function removeAll() {
            if (confirm('Are you sure to Delete All Items?')) {
                todoService.removeAll();
                $scope.todoList = {};
            }
        };

        $scope.makeItDone = function makeItDone(todo) {
            //todoService.makeItDone(todo);
            todoService.remove(todo.id);
        };

        $rootScope.$on('ToDoItemSaved', function(event, newTodoList) {
            $scope.todoList = newTodoList;
        });

        // disabling animate
        $scope.disableHeaderBack();
        $scope.disableAnimate();

        function init() {
            $scope.todoList = todoService.getAll() || [];
        }

        init();

    }]);
