/*global angular, window*/

(function AngularBootstrap() {
    'use strict';

    // creating module
    var app = angular.module("FastToDo", ["ngRoute", "ngAnimate", "ngTouch", "pasvaz.bindonce"]);

    // setting constants
    app.constant(
        "fasttodo.config", {
            //url: "http://fasttodo.herokuapp.com/"
            url: "http://localhost/"
        }
    );

    // config time
    app.config(["$routeProvider", "$httpProvider", function AppConfig($routeProvider, $httpProvider) {
        
        $routeProvider.when("/home", { templateUrl: "partials/home.html", controller: "homeController"});
        $routeProvider.when("/about", { templateUrl: "partials/templates/about.html", controller: "aboutController"});
        $routeProvider.otherwise({ redirectTo: "/home" });        
        
    }]);


    // run time
    app.run(["$route", "$http", "$templateCache", function AppRun($route, $http, $templateCache) {

        // caching templates
        angular.forEach($route.routes, function (r) {
            if (r.templateUrl) {
                $http.get(r.templateUrl, { cache: $templateCache });
            }
        });        

        // fixing orientation on FFOS
        if (window.screen.mozLockOrientation !== undefined) {
            window.screen.mozLockOrientation("portrait");
        }
    }]);
}());