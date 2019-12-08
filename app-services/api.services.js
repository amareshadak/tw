
(function () {
    'use strict';

    angular
        .module('app')
        .factory('ApiService', ApiService);

        ApiService.$inject = ['$http'];
    function ApiService($http) {
        var service = {};

        service.GetAll = GetAll;
        service.GetAllSku = GetAllSku;
      
        return service;

        function GetAll(sukid) {
            return $http.get(`http://15.206.35.51/api/user/plant/message/list/?sku=${sukid}`).then(handleSuccess, handleError('Error getting all users'));
        }

        function GetAllSku() {
            return $http.get(`http://15.206.35.51/api/skuid/list/`).then(handleSuccess, handleError('Error getting all users'));
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
