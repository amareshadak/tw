(function() {
  "use strict";

  angular.module("app").controller("chartTableContoller", chartTableContoller);

  chartTableContoller.$inject = [
    "UserService",
    "$rootScope",
    "$scope",
    "ApiService"
  ];
    function chartTableContoller(UserService, $rootScope, $scope, ApiService) {
        $scope.filter = "hour";
        $scope.isLoad = 1;
        $scope.skuDetailsData = [];
        $scope.sort = function(keyname) {
          $scope.sortKey = keyname; //set the sortKey to the param passed
          $scope.reverse = !$scope.reverse; //if true make it false and vice versa
        };

        initController();

        function initController() {
            if ($scope.isLoad == 1) {
                $scope.isLoad = 0;
                loadAllSku();
            }
        }

        function loadAllSku() {
            ApiService.GetAllSku().then(function (sukdata) {
                $scope.SkuList = sukdata;
                $scope.selectsku = $scope.SkuList[0].uid;
                $scope.loadChartData($scope.selectsku);
            });
        }

  

        $scope.loadChartData = () => {
            let sukid = $scope.selectsku;
            let service = null;
            if ($scope.filter == "hour") {
                service = ApiService.getChartByHours(sukid, 1);
            } else if ($scope.filter == "today") {
                service = ApiService.getChartByDays(sukid, 1);
            } else if ($scope.filter == "week") {
                service = ApiService.getChartByDays(sukid, 7);
            } else if ($scope.filter == "month") {
                service = ApiService.getChartByDays(sukid, 30);
            } else {
                let t1 = $("#b-m-dtp-date1")
                    .val()
                    .replace(/\//g, "");
                let t2 = $("#b-m-dtp-date2")
                    .val()
                    .replace(/\//g, "");
                service = ApiService.getChartByDate(sukid, t1, t2);
            }

            service.then(function (sukdata) {
                $scope.skuDetailsData =sukdata.data;
            });
        };

        $scope.changeSku = (sukid) => {
            $scope.loadChartData();
        };


        $(".datepicker")
            .datepicker({
                format: "dd/mm/yyyy",
                autoclose: true
            })
            .on("changeDate", function (ev) {
                $(this).datepicker("hide");
            });
    }
})();
