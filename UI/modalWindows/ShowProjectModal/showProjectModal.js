
var ShowProjectModalCtrl = angular.module('myApp.showProject', ['ngRoute', 'ui.bootstrap']);

ShowProjectModalCtrl.controller('ShowProjectModalCtrl', function ($scope, $uibModalInstance, project) {

    $scope.project = project;

    $scope.approveProject = function (){

    }

    $scope.rejectProject = function(){

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