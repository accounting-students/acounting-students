'use strict';

var mainPage = angular.module('myApp.mainPage', ['ngRoute']);

mainPage.controller('MainPageCtrl', function ($scope, userService, infoService ,  $rootScope, projectService, likeService) {

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

    $scope.project = [];

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

});