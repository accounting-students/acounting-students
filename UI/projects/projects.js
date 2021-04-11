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
        projectService.getAllProjects().then(function(response){
            console.log(response)
            $scope.projects = commonsService.projects;
        },function () {
            $scope.projects = commonsService.projects;
        })

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
            getAllProjects();
        }, function () {
            getAllProjects();
        });
    }

    $scope.showProjectModal = function(project) {
        var modalInstance = projectService.showProjectModal(project);

    }



});