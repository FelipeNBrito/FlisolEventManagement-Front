app.controller('AttendeesCtrl', ['$scope', '$rootScope', '$http', '$state', '$filter', 'Notification', 'authService', function ($scope, $rootScope, $http, $state, $filter, Notification, authService) {

  $scope.people = [];

  $scope.init = function () {
    $scope.loading = true;
    $http.get(config.server + '/private/attendee').then(function(response){
      if(response.data.success){
        $scope.people = response.data.attendees;
      }

      $scope.loading = false;
    }, function(response){
      $scope.loading = false;
    });
  };

  $scope.attendee = {};


  $scope.addAttendee = function(){


    $http.post(config.server + '/public/attendee/', $scope.attendee)
    .then(function(response){
        if (response.data.success) {
          $scope.people.push(response.data.administrator);
          Notification.success({message:$filter('translate')('ADMINISTRATOR_ADD_SUCCESS'), dalay:4000});
        }

    }, function(error){
      Notification.error({message:$filter('translate')('PADMINISTRATOR_ADD_ERROR'), dalay:4000});
    });


  }

  $scope.accreditAttendee = function(attendeeId) {
    $http.put(config.server + '/private/attendee/accredit/' + attendeeId)
    .then(function(response){
        if (response.data.success) {
          $scope.people.push(response.data.attendee);
          Notification.success({message:$filter('translate')('ADMINISTRATOR_ADD_SUCCESS'), dalay:4000});

          for (var i = 0; i < $scope.people.length; i++) {
            if ($scope.people[i]._id === attendeeId) {
              $scope.people[i].attended = true;
            }
          }

        }

    }, function(error){
      Notification.error({message:$filter('translate')('PADMINISTRATOR_ADD_ERROR'), dalay:4000});
    });
  }

  $scope.deletePerson = function(){
    var selected = $filter('filter')($scope.people, {value: true});

    var ids = [];

    for(i in selected){
      ids.push(selected[i]._id);
    }

    if(!ids.length) return;

    $http({
      method: 'DELETE',
      url: '/api/person/',
      data: {idArray: ids},
      headers: {'Content-Type': 'application/json;charset=utf-8'}
    }).then(function(response){
      for(i in selected){
        var index = $scope.people.indexOf(selected[i]);
        $scope.people.splice(index, 1);
      }
      Notification.success({message:$filter('translate')('PEOPLE_DELETE_SUCCESS'), dalay:4000});
    }, function(error){
      Notification.error({message:$filter('translate')('PEOPLE_DELETE_ERROR'), dalay:4000});
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
