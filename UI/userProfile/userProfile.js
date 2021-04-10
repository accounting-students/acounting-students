'use strict';

var UserProfileCtrl = angular.module('myApp.userProfile', ['ngRoute']);

UserProfileCtrl.controller('UserProfileCtrl', function ($scope, userService, infoService , $rootScope, projectService, commonsService) {

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
        if (!$rootScope.$$phase) {
            $rootScope.$apply();
        }
    }
    getAllProjects();
    function getAllProjects(){
        $scope.projects = commonsService.projects;
        tryDigest();
    }
    function tryDigest() {
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }

    $scope.createProject = function(){
        projectService.projectStatusId = 1;
        userService.redirectTo("createProject");
    }

    $scope.redirectToProject = function(projectId){
        if(projectId) {
            projectService.projectId = projectId;
            userService.redirectTo("project");
        } else
            infoService.infoFunction("Невозможно открыть проект: нет id проекта", "Ошибка");
    }
    $scope.showProjectModal = function(){
        var modalInstance = projectService.showProjectModal();
        modalInstance.result.then(function (response) {

        }, function () {});
    }

});