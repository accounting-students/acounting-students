'use strict';

var createProject = angular.module('myApp.project', ['ngRoute']);

createProject.controller('ProjectCtrl', function ($scope, userService, projectService, commonsService) {

    var userInt = setInterval(function(){
        if(userService.User) {
            $scope.loaded  = true;
            clearInterval(userInt)
            $scope.user = userService.User;
            getAllProjects();
            console.log($scope.user)
            tryDigest();
        }
    },300)

    $scope.selectedPage = 1;
    $scope.projects = [];


    function getAllProjects(){
        $scope.projects = commonsService.projects;
        tryDigest();
    }
    function tryDigest() {
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }
    $scope.createNewProject = function(){
        var modalInstance = projectService.createNewProject();
        modalInstance.result.then(function (response) {
        }, function () {});
    }

    $scope.showProjectModal = function(){
        var modalInstance = projectService.showProjectModal();
        modalInstance.result.then(function (response) {

        }, function () {});
    }



});