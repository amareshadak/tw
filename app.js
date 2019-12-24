(function () {
    'use strict';

    angular
      .module("app", [
        "ngRoute",
        "ngCookies",
        "toastr",
        "ngAnimate",
        "chart.js",
        "ui.bootstrap",
        "ui.utils",
        "angularUtils.directives.dirPagination"
      ])
        .filter('toArray', function () {
  return function (obj, addKey) {
    if (!angular.isObject(obj)) return obj;
    if ( addKey === false ) {
      return Object.keys(obj).map(function(key) {
        return obj[key];
      });
    } else {
      return Object.keys(obj).map(function (key) {
        var value = obj[key];
        return angular.isObject(value) ?
          Object.defineProperty(value, '$key', { enumerable: false, value: key}) :
          { $key: key, $value: value };
      });
    }
  };
})
      .config(config)
      .run(run);


        

    config.$inject = [
      "$routeProvider",
      "$locationProvider",
      "$httpProvider",
      "$qProvider"
    ];
    
    function config(
      $routeProvider,
      $locationProvider,
      $httpProvider,
      $qProvider
    ) {
      $qProvider.errorOnUnhandledRejections(false);
      //Enable cross domain calls
      $httpProvider.defaults.useXDomain = true;

      //Remove the header used to identify ajax call  that would prevent CORS from working
      delete $httpProvider.defaults.headers.common["X-Requested-With"];

      $httpProvider.interceptors.push("APIInterceptor");
      $routeProvider
        .when("/", {
          controller: "HomeController",
          templateUrl: "pages/home/home.view.html",
          controllerAs: "vm"
        })

        .when("/login", {
          controller: "LoginController",
          templateUrl: "pages/login/login.view.html",
          controllerAs: "vm"
        })

        .when("/register", {
          controller: "RegisterController",
          templateUrl: "pages/register/register.view.html",
          controllerAs: "vm"
        })

        .otherwise({ redirectTo: "/login" });
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {

        if (localStorage.getItem('tw_auth_details') == null) {
            window.location = 'login.html';
        }
        else {
            try {
                $rootScope.username = JSON.parse(localStorage.getItem('tw_auth_details')).username;
            } catch (error) {
                localStorage.removeItem('tw_auth_details');
                window.location = 'login.html';
            }
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            if (localStorage.getItem('tw_auth_details') == null) {
                window.location = 'login.html';
            }
            else {
                try {
                    $rootScope.username = JSON.parse(localStorage.getItem('tw_auth_details')).username;
                } catch (error) {
                    localStorage.removeItem('tw_auth_details');
                    window.location = 'login.html';
                }
            }
        });
    }

})();


angular.module('app').service('APIInterceptor', [function() {
    var service = this;

    service.request = function (config) {
        if (localStorage.getItem('tw_auth_details') == null) {
            window.location = 'login.html';
        }
        config.headers.Authorization = `Token ${JSON.parse(localStorage.getItem('tw_auth_details')).token}`;
        config.headers.Accept = 'application/json';
        return config;
    };
}]);