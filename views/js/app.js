var config = {
  server: "http://192.168.1.17:5051"
};

var app = angular.module('event', ['ui.router', 'ngCookies', 'ngMessages', 'pascalprecht.translate', 'ngSanitize',
    'ui.codemirror', 'ui.materialize', 'angular-jwt',
    'ui-notification', 'angularFileUpload',
    'ngMaterial', 'tmh.dynamicLocale']);

app.controller('appCtrl', ['$scope', '$rootScope', 'authService', function ($scope, $rootScope, authService) {
    $scope.isLogged = function () {
      return authService.isLogged();
    };

    $scope.logout = function () {
      authService.logout();
    };

}]);

app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'tmhDynamicLocaleProvider',
    function($stateProvider, $urlRouterProvider, $httpProvider, tmhDynamicLocaleProvider){
      tmhDynamicLocaleProvider.localeLocationPattern('/node_modules/angular-i18n/angular-locale_{{locale}}.js');

      $stateProvider.state('login', {
        url: '/login',
        templateUrl: '/views/login/login.html',
        controller: 'LoginCtrl'
      })

      .state('logout', {
          controller: function(authService, $state) {
            authService.logout();
            $state.go("login");
          },
          authenticate: true
      })

      .state('home', {
        url: '/home',
        templateUrl: '/views/home/home.html',
        authenticate: true
      })

      .state('administrators', {
        url: '/administrators',
        templateUrl: '/views/administrators/administrators.html',
        authenticate: true,
        controller: 'AdministratorsCtrl'
      })

      .state('attendees', {
        url: '/attendees',
        templateUrl: '/views/attendees/attendees.html',
        authenticate: true,
        controller: 'AttendeesCtrl'
      })

      ;

      $urlRouterProvider.otherwise('home');
      $httpProvider.interceptors.push('tokenInterceptor');
}]);

app.filter('percentOpen', function($filter){
   return function(n){
      if(!n.to) return;
      var open = $filter('filter')(n.to, {seen: 'true'});
      return parseInt(100*open.length/ n.to.length)+"%";
   }
});

app.filter('percentConfirmed', function($filter){
   return function(n){
      if(!n.to) return;
      var open = $filter('filter')(n.to, {confirmed: 'true'});
      return parseInt(100*open.length/ n.to.length)+"%";
   }
});

app.filter('percentSent', function($filter){
   return function(n){
      if(!n.to) return;
      var open = $filter('filter')(n.to, {sent: 'true'});
      return parseInt(100*open.length/ n.to.length)+"%";
   }
});

app.filter('percentClick', function($filter){
   return function(n){
      if(!n.to) return;
      var to = $filter('filter')(n.to, {click: 'true'});
      return parseInt(100*to.length/ n.to.length)+"%";
   }
});

app.filter('percentUnsubscribed', function($filter){
   return function(n){
      if(!n.to) return;
      var unsubscribed = $filter('filter')(n.to, {unsubscribed: 'true'});
      return parseInt(unsubscribed.length/ n.to.length)+"%";
   }
});

app.filter('sent', function($filter){
   return function(n){
     var total = n.to.length;
     var sent = $filter('filter')(n.to, {sent: true});
     return $filter('translate')('SENT', {qtd:sent.length, total: total});
   }
});

app.filter("localeOrderBy", [function () {
        return function (array, sortPredicate, reverseOrder) {
            if (!Array.isArray(array)) return array;
            if (!sortPredicate) return array;

            var isString = function (value) {
                return (typeof value === "string");
            };

            var isNumber = function (value) {
                return (typeof value === "number");
            };

            var isBoolean = function (value) {
                return (typeof value === "boolean");
            };

            var arrayCopy = [];
            angular.forEach(array, function (item) {
                arrayCopy.push(item);
            });

            arrayCopy.sort(function (a, b) {
                var valueA = a[sortPredicate];
                var valueB = b[sortPredicate];

                if (isString(valueA))
                    return !reverseOrder ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);

                if (isNumber(valueA) || isBoolean(valueA))
                    return !reverseOrder ? valueA - valueB : valueB - valueA;

                return 0;
            });

            return arrayCopy;
        }
    }]);

app.factory('tokenInterceptor', ['$q', '$cookies', function ($q, $cookies) {
        return {
            'request' : function (config) {
                var token = $cookies.get('token');
                if(token != null) {
                    config.headers['x-access-token'] = token;
                }
                return config;
            }
        };
    }]);

app.run(['$rootScope', "authService", '$state', '$http', function ($rootScope, authService, $state, $http) {
    $rootScope.$on("$stateChangeStart", function (event, toState, toStateParams) {

         if(toState.authenticate && !authService.isLogged()) {

             $state.transitionTo('login');
             event.preventDefault();

         }
    });

    
}]);

app.controller("TableFieldsCtrl", ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http){
  $scope.saveFields = function(){
    $http.post('/api/administrator/updateOne', {tablePreferences: $rootScope.peopleFields});
  };
}]);
