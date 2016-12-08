app.controller('LoginCtrl', ['$scope', 'authService', '$state', 'Notification', '$filter', function ($scope, authService, $state, Notification, $filter) {
  $scope.login = function($valid){
    if(!$valid) return;
    authService.login($scope.email, $scope.password, $scope.keepLogged, function(response){
      if(!response){
            $scope.loginFailed = false;
            $state.go("home");
      }else{
          Notification.error({message: $filter('translate')('ERROR_LOGIN'), delay: 4000});
          $scope.loginFailed = true;
      }
    });
  }
}]);
