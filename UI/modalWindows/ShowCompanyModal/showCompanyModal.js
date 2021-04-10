
var ShowCompanyCtrl = angular.module('myApp.showCompany', ['ngRoute', 'ui.bootstrap']);

ShowCompanyCtrl.controller('ShowCompanyCtrl', function ($scope, $uibModalInstance, company, infoService, regionService) {

    $scope.company = company;

    $scope.wantToCompany = function(){
        close();
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