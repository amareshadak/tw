
(function () {
    'use strict';

    angular
        .module('app')
        .factory('ApiService', ApiService);

        ApiService.$inject = ['$http'];
    function ApiService($http) {
        var service = {};

        service.GetAll = GetAll;
      
        return service;

        function GetAll() {
            return $http.get(`http://15.206.35.51/api/machine/message/list/579397848997/?sku=1501cede7aab732f5de84f7e65d001e1`).then(handleSuccess, handleError('Error getting all users'));
        }








      








          // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
