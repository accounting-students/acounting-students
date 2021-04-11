
var addStudentToProject = angular.module('myApp.addStudentToProject', ['ngRoute', 'ui.bootstrap']);

addStudentToProject.controller('addStudentToProjectCtrl', function ($scope, $uibModalInstance, userService, commonsService, student, projectService, infoService) {


    var userInt = setInterval(function(){
        if(userService.User) {
            $scope.loaded  = true;
            clearInterval(userInt)
            $scope.user = userService.User;
            tryDigest();
        }
    },300);

    function tryDigest() {
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }
    $scope.student = student;
    $scope.projects = commonsService.projects;

    $scope.createRequest = function(){
        if($scope.student.userId && $scope.project && $scope.roleName) {
            projectService.addStudentToProjectRequest($scope.student.userId, $scope.project, $scope.roleName).then(function () {
                close();
            })
        } else {
            infoService.infoFunction("Выберите проект", "Ошибка");
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