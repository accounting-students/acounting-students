'use strict';

var universities = angular.module('myApp.universities', ['ngRoute']);

universities.controller('UniversitiesCtrl', function ($scope, commonsService, userService, projectService
) {


    var userInt = setInterval(function(){
        if(userService.User) {
            $scope.loaded  = true;
            clearInterval(userInt)
            $scope.user = userService.User;
            getUniversities();
            tryDigest();
        }
    },300)

    function tryDigest() {
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }

    $scope.sortType ='lastname';
    $scope.reverse =true;
    $scope.order = function(reverse, sortType){
        $scope.sortType = sortType;
        $scope.reverse = reverse;
    }

    function getUniversities() {
        projectService.getAllUniversity().then(function (universities) {
            $scope.universities = universities.university;
        },function () {
            $scope.universities = commonsService.universities;
        })

    }


});