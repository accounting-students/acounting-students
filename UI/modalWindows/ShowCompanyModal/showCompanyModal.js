
var ShowCompanyCtrl = angular.module('myApp.showCompany', ['ngRoute', 'ui.bootstrap']);

ShowCompanyCtrl.controller('ShowCompanyCtrl', function ($scope, $uibModalInstance, company, infoService, userService, projectService) {

    $scope.company = company;
    var userInt = setInterval(function(){
        if(userService.User) {
            $scope.loaded  = true;
            clearInterval(userInt)
            $scope.user = userService.User;
            console.log($scope.user)
            tryDigest();
        }
    },300)

    function tryDigest() {
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }

    $scope.wantToCompany = function(){
        if($scope.company.id && $scope.user.userId) {
            projectService.addStudentRequest( $scope.user.userId, $scope.company.id).then(function () {
                infoService.infoFunction( "Ваша заявка успешно отправлена", "Информация");
                close();
            })
        } else {
            infoService.infoFunction("Выберите компанию", "Ошибка");
        }
    }

    $scope.close = function () {
        close();
    };

    function  close(){
        $uibModalInstance.close();
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});