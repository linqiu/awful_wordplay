angular.module('awfulWordplayApp').factory('WordPlayService', [
    '$q',
    '$http',

    function(
        $q,
        $http
    ) {
        'use strict';

        function getWord(word){
            var deferred = $q.defer(),
                requestData = {
                    method: 'GET',
                    url: '/words/' + word
                };

            $http(requestData).then(function success(response) {
                deferred.resolve(response.data);
            });

            return deferred.promise;
        }

        return {
            getWord: getWord
        };

    }
]);
