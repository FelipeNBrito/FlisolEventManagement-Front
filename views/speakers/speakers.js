app.controller('SpeakersCtrl', ['$scope', '$rootScope', '$http', '$state', '$filter', 'Notification', 'authService', function ($scope, $rootScope, $http, $state, $filter, Notification, authService) {

  $scope.people = [];

  $scope.init = function () {
    $scope.loading = true;
    $http.get(config.server + '/private/speaker').then(function(response){
      if(response.data.success){
        $scope.people = response.data.speakers;
      }

      $scope.loading = false;
    }, function(response){
      $scope.loading = false;
    });
  };

  $scope.speaker = {};


  $scope.addAttendee = function(){


    $http.post(config.server + '/private/speaker/', $scope.speaker)
    .then(function(response){
        if (response.data.success) {
          $scope.people.push(response.data.speaker);
          Notification.success({message:$filter('translate')('SPEAKER_ADD_SUCCESS'), dalay:4000});
        }

    }, function(error){
      Notification.error({message:$filter('translate')('SPEAKER_ADD_ERROR'), dalay:4000});
    });


  }

  $scope.selectAll = function(){
    for(i in $scope.people){
      $scope.people[i].value = $scope.all;
    }
  };

  $scope.changeSub = function(s){
    s.value = !(s.value);
    if(!s.value && $scope.all){
      $scope.all = false;
    }
  };
}]);
