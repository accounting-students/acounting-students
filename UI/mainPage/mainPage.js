'use strict';

var mainPage = angular.module('myApp.mainPage', ['ngRoute']);

mainPage.controller('MainPageCtrl', function ($scope, userService, infoService ,  $rootScope, projectService, $timeout) {

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
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }

    $timeout(function(){
        if(userService.User) $scope.isAuthorized = true;
        else  $scope.isAuthorized = false;
        tryDigest()
    }, 150)

    $scope.logIn = function(){
        var modalInstance = userService.openAuthModal();
        modalInstance.result.then(function (response) {
            if(userService.User) {
                $scope.user = userService.User;
                $scope.isAuthorized = true;
                $rootScope.$broadcast('user:isActive', false);
            }
        }, function () {});
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