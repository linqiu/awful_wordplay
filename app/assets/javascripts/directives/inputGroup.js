angular.module('awfulWordplayApp').directive('inputGroup', [
    '$timeout',

    function(
        $timeout
    ) {

        'use strict';

        return {
            restrict:    'E',
            replace: true,
            scope: {
                ngModel: '=',
                ngChange: '='
            },
            templateUrl: '../../views/directives/input-group.html',
            link:        function($scope, $element, $attrs) {
                $scope.form = $scope.ngModel;
                $scope.retryMessages = [
                    'Oh good you\'re gonna try again.',
                    'Even retards deserve another chance',
                    'Your mom said you\'d try hard last night',
                    'Do you even feel bad that you failed?',
                    'DO OR DO NOT. THERE IS NO TRY.'
                ];

                $element.find('input').on('focus', function() {
                    if(!$scope.form.valid) {
                        $timeout(function() {
                            $scope.form.retry = true;
                            $scope.form.valid = true;
                            $scope.giveMotivation();
                        });
                    }
                });

                function getRandomInt(min, max) {
                    return Math.floor(Math.random() * (max - min)) + min;
                }

                $scope.giveMotivation = function() {
                    var num = $scope.retryMessages.length,
                        randoIndex = getRandomInt(0, num);

                    $scope.motivationMessage = $scope.retryMessages[randoIndex];
                };

                $scope.errorType = function(type) {
                    var article = '';

                    if(type.toLowerCase() === 'noun'){
                        article = 'a';
                    }
                    else {
                        article = 'an';
                    }

                    return 'That\'s not ' + article + ' ' + type.toLowerCase() +  ' you stupid fuck.';
                };
            }
        };

    }
]);