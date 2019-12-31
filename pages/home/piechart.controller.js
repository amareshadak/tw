(function () {
    "use strict";
  
    angular.module("app").controller("piechartController", piechartController);
  
    piechartController.$inject = [
        "UserService",
        "$rootScope",
        "$scope",
        "ApiService"
    ];
    function piechartController(UserService, $rootScope, $scope, ApiService) {
        localStorage.users = `[{"firstName":"admin","lastName":"admin","username":"admin","password":"password","id":1}]`;
        $scope.filter = 'hour';
        $scope.isLoad = 1;
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
                $scope.selectskupie = $scope.SkuList[0].uid;
                $scope.loadChartData($scope.selectsku);
                loadPieChart($scope.selectskupie);
            });
        }
  
        $scope.labels = new Array();
        $scope.series = new Array();
        $scope.data = new Array();
        $scope.ul = 0;
        $scope.ll = 0;
      
        $scope.loadChartData = () => {
            let sukid = $scope.selectsku;
            let service = null;
            if ($scope.filter == 'hour') {
                service = ApiService.getChartByHours(sukid, 1);
            }
            else if ($scope.filter == 'today') {
                service = ApiService.getChartByDays(sukid, 1);
            }
            else if ($scope.filter == 'week') {
                service = ApiService.getChartByDays(sukid, 7);
            }
            else if ($scope.filter == 'month') {
                service = ApiService.getChartByDays(sukid, 30);
            }
            else {
                let t1 = $('#b-m-dtp-date1').val().replace(/\//g, '')
                let t2 = $('#b-m-dtp-date2').val().replace(/\//g, '')
                service = ApiService.getChartByDate(sukid, t1, t2);
            }
  
  
  
            service.then(function (sukdata) {
  
                $scope.location = sukdata.Location;
                $scope.plant_name = sukdata.plant_name;
                let ul = new Array();
                let ll = new Array();
                let bw = new Array();
                $scope.series = ["Upper Limit", "SUK", "Lower Limit"];
                $scope.data.length = 0;
                $scope.labels.length = 0;
  
                angular.forEach($scope.SkuList, function (value, key) {
                    if (value.uid == $scope.selectsku) {
                        $scope.ul = value.ul;
                        $scope.ll = value.ll;
                    }
                });
  
                $scope.skuDetailsData = sukdata.data;
                angular.forEach(sukdata.data, function (value, key) {
                    ul.push($scope.ul);
                    bw.push(value.box_weight);
                    ll.push($scope.ll);
                    $scope.labels.push(
                        moment(new Date(value.timestamp_created)).format(
                            "MM/DD/YYYY hh:mm A"
                        )
                    );
                });
  
                $scope.data.push(ul);
                $scope.data.push(bw);
                $scope.data.push(ll);
  
                $scope.datasetOverride = [{ yAxisID: "y-axis-1" }];
                $scope.options = {
                    responsive: true,
                    maintainAspectRatio: true,
                    legend: {
                        display: false,
                        labels: {
                            fontColor: "rgb(255, 99, 132)"
                        }
                    },
                    scales: {
                        yAxes: [
                            {
                                type: "linear",
                                display: true,
                                position: "left",
                                id: "y-axis-1",
                                gridLines: {
                                    display: false
                                },
                                labels: {
                                    show: true
                                },
                                ticks: {
                                    max: $scope.ul + 200,
                                    min: $scope.ll - 5,
                                    stepSize: $scope.ul / 25
                                }
                            }
                        ]
                    }
                };
            });
  
            // $(".datatables-demo").dataTable();
        }
  
        $scope.changeSku = sukid => {
            $scope.loadChartData();
        };
  
        $scope.onClick = function (points, evt) {

        };
  
  
      
  
        $scope.width = "";
        $scope.height = "100";
        if (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            )
        ) {
            $scope.width = "100";
            $scope.height = "100";
        }
  
        $scope.changeSkuPie = sukid => {
            loadPieChart(sukid);
        }

        $scope.pieoptions = {
            responsive: true,
            barValueSpacing: 2,
            legend: {
                display: true,
                labels: {
                    fontColor: "rgb(255, 99, 132)"
                }
            }
        };

        function loadPieChart(sukid) {


             sukid = $scope.selectsku;
            let service = null;
            if ($scope.filter == 'hour') {
                service = ApiService.getChartByHours(sukid, 1);
            }
            else if ($scope.filter == 'today') {
                service = ApiService.getChartByDays(sukid, 1);
            }
            else if ($scope.filter == 'week') {
                service = ApiService.getChartByDays(sukid, 7);
            }
            else if ($scope.filter == 'month') {
                service = ApiService.getChartByDays(sukid, 30);
            }
            else {
                let t1 = $('#b-m-dtp-date1').val().replace(/\//g, '')
                let t2 = $('#b-m-dtp-date2').val().replace(/\//g, '')
                service = ApiService.getChartByDate(sukid, t1, t2);
            }
  
  
  
            service.then(function (sukdata) {
                console.log(sukdata)
                console.log($scope.SkuList)
            });



            $scope.piedata = [];
            $scope.pielabels = ["Ok", "Overweight", "Underweight", "Rejected"];
            angular.forEach($scope.SkuList, function (value, key) {
                if (value.uid == sukid) {
                    $scope.piedata.push(value.total_msg_accept)
                    $scope.piedata.push(value.total_over_weight);
                    $scope.piedata.push(value.total_under_weight);
                    $scope.piedata.push(value.total_msg_reject)
                }
            });
        
       
        }
  
     
        $('.datepicker').datepicker({
            format: "dd/mm/yyyy",
            autoclose: true,
        }).on('changeDate', function (ev) {
            $(this).datepicker('hide');
        });
   
    }
})();