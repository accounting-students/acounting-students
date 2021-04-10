
var ShowProjectModalCtrl = angular.module('myApp.showProject', ['ngRoute', 'ui.bootstrap']);

ShowProjectModalCtrl.controller('ShowProjectModalCtrl', function ($scope, $uibModalInstance) {

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