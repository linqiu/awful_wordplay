'use strict';

/**
 * @ngdoc function
 * @name awfulWordplayApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the awfulWordplayApp
 */
angular.module('awfulWordplayApp').controller('MainCtrl', [
    '$q',
    '$scope',
    'WordPlayService',
    function (
        $q,
        $scope,
        WordPlayService
    ) {
        $scope.wordForm = [
            {
                placeholder: 'Adjective',
                speech: 'Adjective',
                check: true,
                valid: true,
                retry: false
            },
            {
                placeholder: 'Adverb',
                speech: 'Adverb',
                check: true,
                valid: true,
                retry: false
            },
            {
                placeholder: 'Body Part',
                speech: 'Noun',
                check: true,
                valid: true,
                retry: false
            },
            {
                placeholder: 'Name of a Friend',
                speech: 'Noun',
                check: false,
                valid: true,
                retry: false
            },
            {
                placeholder: 'Adjective',
                speech: 'Adjective',
                check: true,
                valid: true,
                retry: false
            },
            {
                placeholder: 'City',
                speech: 'Noun',
                check: false,
                valid: true,
                retry: false
            }
        ];
        $scope.buttonPressed = false;
        $scope.showForm = true;


        $scope.isFormFilled = function() {
            return _.all($scope.wordForm, function(text) {
                return !_.isEmpty(text.model);
            });
        };

        $scope.isFormValid = function() {
            return _.all($scope.wordForm, function(text) {
                return text.valid;
            });
        };

        $scope.buttonReady = function() {
            return $scope.isFormFilled() && $scope.isFormValid();
        };

        $scope.submitText = function() {
            var message = '';
            if($scope.isFormFilled() && !$scope.buttonPressed) {
                message = 'Done';
            }
            else if($scope.isFormFilled() && $scope.isFormValid() && $scope.buttonPressed) {
                message = 'Try Again';
            }
            else if($scope.isFormFilled() && !$scope.isFormValid() && $scope.buttonPressed) {
                message = 'Christ, learn parts of speech';
            }
            else {
                message = 'You Ain\'t Done Yet!';
            }

            return message;
        };

        $scope.resetForm = function() {
            $scope.showForm = true;
        };

        function includedPartofSpeech(array, part) {
            return _.any(array, function(item) {
                if(item.partOfSpeech) {
                    return item.partOfSpeech === part.toLowerCase();
                }
                else {
                    return true;
                }
            });
        }

        $scope.checkForm = function() {
            var checkWords = _.filter($scope.wordForm, {check: true}),
                checkDefered = [];

            _.each(checkWords, function(word) {
                checkDefered.push(WordPlayService.getWord(word.model));
            });

            $q.all(checkDefered).then(function(responses){
                var fails = 0;
                _.each(responses, function(response, index){
                    var definitions = response.definitions,
                        word = checkWords[index];

                    word.retry = false;

                    if(!_.isEmpty(definitions) && !includedPartofSpeech(definitions, word.speech)) {
                        word.valid = false;
                        fails++;
                    }
                    else {
                        word.valid = true;
                    }
                });

                $scope.buttonPressed = true;

                if(fails === 0) {
                    $scope.showForm = false;
                }
            });
        };

        // Mad Libs shit
        $scope.adjectiveOne = function() {
            return $scope.wordForm[0].model;
        };

        $scope.adverbOne = function() {
            return $scope.wordForm[1].model;
        };

        $scope.bodyPart = function() {
            return $scope.wordForm[2].model;
        };

        $scope.friendName = function() {
            return $scope.wordForm[3].model;
        };

        $scope.adjectiveTow = function() {
            return $scope.wordForm[4].model;
        };

        $scope.city = function() {
            return $scope.wordForm[5].model;
        };


    }
]);