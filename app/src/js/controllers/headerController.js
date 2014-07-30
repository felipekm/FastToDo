/*global angular, console, confirm*/

angular.module('FastToDo').controller(
    'headerController', 'todoService',

    function ($scope) {
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

    }
);