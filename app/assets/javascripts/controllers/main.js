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
                valid: true
            },
            {
                placeholder: 'Adverb',
                speech: 'Adverb',
                check: true,
                valid: true
            },
            {
                placeholder: 'Body Part',
                speech: 'Noun',
                check: true,
                valid: true
            },
            {
                placeholder: 'Name of a Friend',
                speech: 'Noun',
                check: false,
                valid: true
            },
            {
                placeholder: 'Adjective',
                speech: 'Adjective',
                check: true,
                valid: true
            },
            {
                placeholder: 'City',
                speech: 'Noun',
                check: false,
                valid: true
            }
        ];


        $scope.buttonReady = function() {
            return _.all($scope.wordForm, function(text) {
                return !_.isEmpty(text.model);
            });
        };

        $scope.submitText = function() {
            var message = '';
            if($scope.buttonReady()) {
                message = 'Done';
            }
            else {
                message = 'You Ain\'t Done Yet!';
            }

            return message;
        };

        $scope.errorType = function(type) {
            var text = '';
            if(type === 'noun'){
                text = 'a';
            }
            else {
                text = 'an';
            }

            return 'That\'s not ' + text + type +  ' you stupid fuck.';
        };

        function includedPartofSpeech(array, part) {
            return _.any(array, function(item) {
                return item.partOfSpeech === part;
            });
        }

        $scope.checkForm = function() {
            var checkWords = _.filter($scope.wordForm, {check: true}),
                checkDefered = [];

            _.each(checkWords, function(word) {
                checkDefered.push(WordPlayService.getWord(word.model));
            });

            $q.all(checkDefered).then(function(responses){
                _.each(responses, function(response, index){
                    var definitions = response.definitions,
                        word = checkWords[index];

                    if(!includedPartofSpeech(definitions, word.speech)) {
                        word.valid = false;
                    }
                });
            });
        };
    }
]);