/*global angular, window */
angular.module("FastToDo").factory("storageFactory", function () {
    'use strict';
    
    return function (provider) {
        
        //
        if (!window[provider]) {
            throw new Error('Invalid storage provider: ' + provider);
        }
        
        //
        return {
            storage_provider : provider,
            clear: function () {
                window[this.storage_provider].clear();
            },
            get: function (key) {
                var value = window[this.storage_provider].getItem(key);
                return value;
            },
            getObj: function (key) {
                return JSON.parse(this.get(key));
            },
            put: function (key, value) {
                window[this.storage_provider].setItem(key, value);
            },
            putObj: function (key, value) {
                this.put(key, JSON.stringify(value));
            }
        };
    };
    
});