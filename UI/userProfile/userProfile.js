'use strict';

var UserProfileCtrl = angular.module('myApp.userProfile', ['ngRoute']);

UserProfileCtrl.controller('UserProfileCtrl', function ($scope, userService, infoService , $rootScope, projectService, commonsService, $location) {

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

    var userId = $location.$$search['userId'];
    if(userId) {
        $scope.userProfile = userService.getUserById(userId);
    } else {
        userService.redirectTo("main");
    }

    $scope.showProjectModal = function(project) {
        var modalInstance = projectService.showProjectModal(project);

    }


});