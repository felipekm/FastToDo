/*global angular, console, confirm*/

angular.module("FastToDo").controller("homeController", ["$scope", "$http", "$rootScope", 'todoService', function ($scope, $http, $rootScope, todoService) {
    'use strict';

    $scope.modelTodo = {};
    
    $scope.headerTitle = "Fast ToDo";
    
    $scope.isTitleRemainingVisible = false;
    $scope.isDescriptionRemainingVisible = false;
    
    $scope.showRemaining = function showRemaining (type) {
        if (type === 'title') {
            $scope.isTitleRemainingVisible = !$scope.isTitleRemainingVisible;
        } else
            $scope.isDescriptionRemainingVisible = !$scope.isDescriptionRemainingVisible;
    } 
    $scope.isAddMode = function isAddMode() {
        $scope.headerTitle = "New Item";
        
        return $rootScope.isAddMode;
    };
    
    $scope.about = function about() {
        $scope.goTo('/about');
    };
    
    $scope.details = function details() {
        $scope.goTo('/details');
    }

    $scope.isDeleteMode = function isDeleteMode() {
        return $rootScope.isDeleteMode;
    };

    $scope.openAdd = function openAdd() {
        $rootScope.isAddMode = true;
    };

    $scope.openDelete = function openDelete() {
        $rootScope.isDeleteMode = true;
    };

    $scope.itemsToBeDone = function itemsToBeDone () {
        var count = 0;
        for(var i in $scope.todoList) {            
            if ($scope.todoList[i].isDone === false) {
                count += 1;
            }
        }
        return count;
    }

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
        $scope.isAddMode = false;
        $scope.headerTitle = "Fast ToDo";
        return;    
    };

    $scope.saveNewItem = function saveNewItem(action) {
        $rootScope.isAddMode = false;

        if ($scope.modelTodo.description && $scope.modelTodo.title) {
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
                todoService.save($scope.todoList).then(
                    function(data) {
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
                    isDone: false
                }
            }        
        }
    };

    $scope.removeItem = function removeItem(todoId) {
        todoService.remove(todoId).then(
            function(data) {
                $scope.todoList = data || []
            },
            function(reason) {
                console.log('[ERROR] - ' + reason);
                $scope.todoList = todoService.getAll();
            }
        );
    };

    $scope.deleteAll = function deleteAll() {
        if (confirm('Are you sure to Delete All Items?')) {
            todoService.clear().then(
                function(data) {
                    $scope.todoList = data;
                },
                function() {
                    console.log('[ERROR] - ' + reason);
                    $scope.todoList = todoService.getAll();
                }
            );
        }
    }

    $scope.doneItem = function doneItem(todoId) {
        todoService.done(todoId);
        $scope.todoList = todoService.getAll() || [];
    };

    $scope.closeDelete = function closeDelete() {
        if (confirm('Are you sure?'), function () {
            todoService.clear();
        });

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