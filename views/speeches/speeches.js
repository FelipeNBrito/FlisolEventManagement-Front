app.controller('SpeechesCtrl', ['$scope', '$rootScope', '$http', '$state', '$filter', 'Notification', 'authService', function ($scope, $rootScope, $http, $state, $filter, Notification, authService) {

  $scope.speeches = [];

  $scope.init = function () {
    $scope.loading = true;
    $http.get(config.server + '/public/speeches').then(function(response){
      if(response.data.success){
        $scope.speeches = response.data.speeches;
      }

      $scope.loading = false;
    }, function(response){
      $scope.loading = false;
    });
  };

  $scope.speech = {};


  $scope.addSpeach = function(){


    $http.post(config.server + '/private/speach/', $scope.speach)
    .then(function(response){
        if (response.data.success) {
          $scope.speeches.push(response.data.administrator);
          Notification.success({message:$filter('translate')('SPEACH_ADD_SUCCESS'), dalay:4000});
        }

    }, function(error){
      Notification.error({message:$filter('translate')('SPEACH_ADD_ERROR'), dalay:4000});
    });


  }

  $scope.selectAll = function(){
    for(i in $scope.speeches){
      $scope.speeches[i].value = $scope.all;
    }
  };

  $scope.changeSub = function(s){
    s.value = !(s.value);
    if(!s.value && $scope.all){
      $scope.all = false;
    }
  };
}]);
