'use strict';

/**
 * @ngdoc function
 * @name awfulWordplayApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the awfulWordplayApp
 */
angular.module('awfulWordplayApp').controller('AboutCtrl', [
    '$scope',
    function (
        $scope
    ) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    }
]);
