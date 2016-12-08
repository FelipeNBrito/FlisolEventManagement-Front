app.factory('authService', ['$http', '$cookies', 'jwtHelper', '$rootScope', function ($http, $cookies, jwtHelper, $rootScope) {
    var service = {
        errors: {
            INCORRECT_PASSWORD: "Incorrect password.",
            EMAIL_NOT_REGISTERED: "Email not registered.",
            MISSING_EMAIL: "Missing parameter: email.",
            MISSING_PASSWORD: "Missing parameter: password.",
            INTERNAL_SERVER_ERROR: "Internal server error"
        }
    };

    var isLogged = false;
    var isAdmin = false;

    service.login = function (email, password, keepLogged,  callback) {

        callback = typeof callback === "function" ? callback : function () {};

        $http.post(config.server + '/public/authenticate', {
            email : email,
            password : password
        }).then(
            function (response) {
                if(response.data.success == true){
                    saveToken(response.data.token, keepLogged);
                    callback();
                }else{
                }
            },
            function (response) {
                if(response.status === 401){
                    callback({message: response.data.message});
                }else if(response.status === 422){
                    callback({message: response.data.message});
                }else if(response.status === 500){
                    callback({message: service.errors.INTERNAL_SERVER_ERROR});
                }
            }
        );
    };
    
    service.token = function () {
        return $cookies.get("token");
    };

    service.isLogged = function () {
        var token = $cookies.get("token");
        if(token){
            return true;
        }
        return false;
    };

    service.logout = function () {
      $cookies.remove('token');
      isAdmin = false;
    };

   function saveToken (token, keepLogged) {
       $cookies.put("token", token, [{secure : true}]);
   }

    return service;
}]);
