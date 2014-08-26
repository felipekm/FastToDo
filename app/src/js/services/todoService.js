/*global angular, console, confirm*/

angular.module("FastToDo").service("todoService", ["$rootScope", "$q", function todoService($rootScope, $q) {
    'use strict';

    var toDoList,
        toDo,
        self = this,
        i;

    function getCreationDate() {
        var today,
            month,
            todoItem,
            options,
            creationDate = {};

        today = new Date();

        options = {
            month: "long"
        };

        month = today.toLocaleString("en-US", options).toUpperCase();

        creationDate = {
            day : today.getDate(),
            month : month.slice(0, 3)
        };

        return creationDate;
    }

    this.save = function save(toDoItem) {
        var savePromise = $q.defer(),
            i = 0;
        
        toDoList = self.getAll() || [];

        if (!toDoItem.id) {
            toDoItem.id = toDoList.length + 1;
            toDoItem.creationDate = getCreationDate();

            toDoList.push(toDoItem);
        } else {

            if (toDoList.length > 0) {
                for (i; i < toDoList.length; i += 1) {
                    if (toDoList[i].id === toDoItem.id) {
                        toDoList[i] = toDoItem;
                    }
                }
            }
        }

        this.toDo = {};

        $rootScope.storage.put('ToDoItems', JSON.stringify(toDoList));
        //$rootScope.$broadcast('ToDoItemSaved', toDoList);
        
        savePromise.resolve(toDoList);
        
        return savePromise.promise;
    };

    this.remove = function remove(todoId) {
        var removePromise = $q.defer();
        toDoList = self.getAll() || [];

        if (toDoList.length > 0) {
            for (i = 0; i < toDoList.length; i += 1) {
                if (toDoList[i].id === todoId) {
                    toDoList.splice(i, 1);
                }
            }

            $rootScope.storage.put('ToDoItems', JSON.stringify(toDoList));
        }
        
        removePromise.resolve(toDoList);
        
        return removePromise.promise;
    };

    this.getAll = function getAll() {
        toDoList = $rootScope.storage.get('ToDoItems') || [];

        if (toDoList.length > 0) {
            toDoList = JSON.parse(toDoList);
        }

        return toDoList;
    };

    this.removeAll = function removeAll() {
        $rootScope.storage.clear('ToDoItems');
        $rootScope.$broadcast('ToDoItemSaved', toDoList);
    };

    this.makeItDone = function makeItDone(todo) {
        self.toDo = todo;
        self.toDo.isDone = true;
        self.save(self.toDo);
    };

    this.setItem = function setItem(item) {
        this.toDo = item;
    };

    this.getItem = function getItem() {
        return this.toDo;
    };

    this.clearItem = function clearItem() {
        this.toDo = {};

    };

}]);
