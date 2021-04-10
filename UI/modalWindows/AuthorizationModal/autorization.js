
var autorization = angular.module('myApp.AutorizationModal', ['ngRoute', 'ui.bootstrap']);

autorization.controller('AutorizationCtrl', function ($scope, $uibModalInstance, userService, infoService, $rootScope) {

    $scope.auth = function(){
        if($scope.login && $scope.password){
            userService.login($scope.login, $scope.password).then(function(response){
                userService.User = response;
                localStorage.setItem('User', JSON.stringify(userService.User))
                close(userService.User);
            }, function (error) {
                infoService.infoFunction(error.message ? error.message : userService.defaultError, "Ошибка");
                $scope.user = userService.User = null;
            });
            //toMain();
        } else {
            $scope.isLoginError = true;
            setTimeout(function (){
                $scope.isLoginError = false;
                tryDigest();
            }, 1500)
        }
    }

    function tryDigest() {
        if (!$rootScope.$$phase) {
            $rootScope.$apply();
        }
    }

    $scope.close = function () {
        close();
    };

    function close(user){
        $uibModalInstance.close(user);
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});