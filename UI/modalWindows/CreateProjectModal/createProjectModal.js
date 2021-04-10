
var CreateProjectCtrl = angular.module('myApp.createProject', ['ngRoute', 'ui.bootstrap']);

CreateProjectCtrl.controller('CreateProjectCtrl', function ($scope, $timeout, $uibModalInstance, projectService, commonsService) {

    $scope.newUser = {};
    $scope.project = {};

    var universityDefault = {universityId:null, universityName:"Выберите университет"};
    $scope.universities = [];
    $scope.universities = JSON.parse(JSON.stringify(commonsService.universities));
    $scope.universities.unshift(universityDefault)

    $scope.project.university = $scope.universities[0];

    $scope.addProject = function(){
        if($scope.project && $scope.project.projectName && $scope.project.description && $scope.project.dateStart && $scope.project.dateEnd) {
            if($scope.project.university) $scope.project.universityName = $scope.project.university
            projectService.addProject($scope.project).then(function () {
                close();
            }, function (error) {
                console.error('CreateProjectCtrl: ', error);
            });
        } else {
            $scope.isError = true;
            $timeout(function (){
                $scope.isError = false;
                tryDigest();
            }, 2000)
        }
    }

    $scope.close = function () {
        close();
    };

    function tryDigest() {
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }

    function  close(result){
        $uibModalInstance.close(result);
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});