'use strict';

/**
 * @ngdoc overview
 * @name awfulWordplayApp
 * @description
 * # awfulWordplayApp
 *
 * Main module of the application.
 */
angular.module('awfulWordplayApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ]).config([
    '$routeProvider',

    function (
        $routeProvider
    ) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);
