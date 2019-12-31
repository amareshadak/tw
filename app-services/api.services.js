
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

        service.getChartByHours = getChartByHours;
        service.getChartByDays = getChartByDays;
        service.getChartByDate = getChartByDate;

        return service;


        // Line chart services
        function getChartByHours(sukid, hours) {
            return $http.get(`http://15.206.35.51/api/user/plant/message/list/v2/?sku=${sukid}&type=h&hours=${hours}`)
                .then(handleSuccess, handleError("Error getting all users"));
        }

        function getChartByDays(sukid, day) {
            return $http.get(`http://15.206.35.51/api/user/plant/message/list/v2/?sku=${sukid}&type=d&days=${day}`)
                .then(handleSuccess, handleError("Error getting all users"));
        }

        function getChartByDate(sukid, t1, t2) {
            return $http.get(`http://15.206.35.51/api/user/plant/message/list/v2/?sku=${sukid}&type=s&t1=${t1}&t2=${t2}`)
                .then(handleSuccess, handleError("Error getting all users"));
        }


        // Pie chart services
        function getPieChartByHours(sukid, hours) {
            return $http.get(`http://15.206.35.51/api/skuid/list/v3/?sku=${sukid}&type=h&hours=${hours}`)
                .then(handleSuccess, handleError("Error getting all users"));
        }

        function getPieChartByDays(sukid, day) {
            return $http.get(`http://15.206.35.51/api/skuid/list/v3/?sku=${sukid}&type=d&days=${day}`)
                .then(handleSuccess, handleError("Error getting all users"));
        }

        function getPieChartByDate(sukid, t1, t2) {
            return $http.get(`http://15.206.35.51/api/skuid/list/v3/?sku=${sukid}&type=s&t1=${t1}&t2=${t2}`)
                .then(handleSuccess, handleError("Error getting all users"));
        }








        function GetAll(sukid) {
            return $http.get(`http://15.206.35.51/api/user/plant/message/list/?sku=${sukid}&type=h&hours=1`)
                .then(handleSuccess, handleError("Error getting all users"));
        }

        function GetAllSku() {
            // http: return $http
            //   .get(`http://15.206.35.51:81/api/skuid/list/`)
            //     .then(handleSuccess, handleError("Error getting all users"));
            
            http: return $http
                .get(`http://15.206.35.51/api/skuid/list/v2/?day=30`)
                .then(
                    handleSuccess,
                    handleError("Error getting all users")
                );
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
