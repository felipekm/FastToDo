/*global angular, console, confirm*/

angular.module('FastToDo').controller('HeaderController', [
    'todoService',
    function HeaderController($scope, todoService) {
        'use strict';

        $scope.isAddMode = false;
        $scope.isAddMode = false;
        $scope.isDeleteMode = false;
        $scope.headerTitle = 'Fast ToDo';

        $scope.save = function (item) {
            if (item.title && item.description) {
                todoService.save(item);
            }
        };

    }]);