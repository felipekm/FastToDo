/*global angular, console, confirm*/

angular.module("FastToDo").service("todoService", ["$rootScope", "$q", function todoService($rootScope, $q) {
    'use strict';

    var toDo = [],
        self = this,
        defer,
        i;

    this.saveList = function saveList(todo) {
        defer = $q.defer();

        $rootScope.storage.put('toDoList', JSON.stringify(todo));
        defer.resolve(self.getAll());

        return defer.promise;
    };

    this.add = function add(todo) {
        var toDoList = self.getAll();
        toDoList.push(todo);
        self.save(toDoList).then(
            function success(data) {
                return data;
            },
            function error(reason) {
                console.log('[ERROR] - ' + reason);
                return reason;
            }
        );
    };
    
    this.save = function save(todo) {
        if (todo.id > 0) {
            var todoList = self.getAll(),
                i;
            for (i = 0; i < todoList.length; i += 1) {
                if (todoList[i].id === todo.id) {
                    todoList[i] = todo;
                    self.saveList(todoList);
                }
            }
        }
    };

    this.remove = function remove(todoId) {
        defer = $q.defer();

        self.toDo = self.getAll();

        for (i = 0; i < self.toDo.length; i += 1) {
            if (self.toDo[i].id === todoId) {
                self.toDo.splice(i, 1);
            }
        }

        self.save(self.toDo);

        return defer.promise;
    };

    this.getAll = function getAll() {
        var data = $rootScope.storage.get('toDoList');
        if (data) {
            self.toDo = JSON.parse(data);
        } else {
            self.toDo = [];
        }

        return self.toDo;
    };

    this.clear = function clear() {
        defer = $q.defer();

        $rootScope.storage.clear('toDoList');
        defer.resolve(self.getAll());

        return defer.promise;
    };

    this.done = function done(todoId) {
        self.toDo = self.getAll();

        for (i = 0; i < self.toDo.length; i += 1) {
            if (self.toDo[i].id === todoId) {
                //self.toDo[i].isDone = true;
                self.toDo.splice(i, 1);
            }
        }

        self.save(self.toDo);
    };

    this.setItem = function setItem(item) {
        this.toDo = item;
    };

    this.getItem = function getItem() {
        return this.toDo;
    };

}]);