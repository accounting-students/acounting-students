
var CreateProjectCtrl = angular.module('myApp.createProject', ['ngRoute', 'ui.bootstrap']);

CreateProjectCtrl.controller('CreateProjectCtrl', function ($scope, $uibModalInstance, projectService, commonsService) {

    $scope.newUser = {};
    $scope.project = null;
    $scope.universities = commonsService.universities;

    $scope.addProject = function(){
        if($scope.project && $scope.project.projectName && $scope.project.description) {
            projectService.addProject($scope.project).then(function () {
                close();
            }, function (error) {
                console.error('CreateProjectCtrl: ', error);
            });
        } else {
            $scope.isError = true;
            setTimeout(function () {
                $scope.isError = false;
                tryDigest();
            }, 1000)
        }
    }

    $scope.close = function () {
        close();
    };

    function tryDigest() {
        if (!$rootScope.$$phase) {
            $rootScope.$apply();
        }
    }

    function  close(result){
        $uibModalInstance.close(result);
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});