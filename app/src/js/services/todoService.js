/*global angular, console, confirm*/

angular.module("FastToDo").service("todoService", ["$rootScope", "$q", function todoService($rootScope, $q) {
    'use strict';

    var toDo = [],
        self = this,
        defer;    
    
    this.save = function save(todo) {
        defer = $q.defer();
        
        $rootScope.storage.put('toDoList', JSON.stringify(todo));
        defer.resolve(self.getAll());
        
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

    this.remove = function remove(todoId) {
        defer = $q.defer();
        
        self.toDo = self.getAll();

        for (var i=0; i < self.toDo.length; i+=1) {
            if (self.toDo[i].id === todoId) {
                self.toDo.splice(i, 1);
            }
        }

        self.save(self.toDo);
        
        return defer.promise;
    };

    this.done = function done(todoId) {
        self.toDo = self.getAll();

        for (var i=0; i < self.toDo.length; i+=1) {
            if (self.toDo[i].id === todoId) {
                //self.toDo[i].isDone = true;
                self.toDo.splice(i, 1);
            }
        }

        self.save(self.toDo);
    };

}]);