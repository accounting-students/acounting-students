'use strict';

var StudentsCtrl = angular.module('myApp.students', ['ngRoute']);

StudentsCtrl.controller('StudentsCtrl', function ($scope, commonsService, userService, projectService) {


    var userInt = setInterval(function(){
        if(userService.User) {
            $scope.loaded  = true;
            clearInterval(userInt)
            $scope.user = userService.User;
            getStudents();
            tryDigest();
        }
    },300)

    $scope.addStudentToProject = function(student){
        var modalInstance = projectService.addStudentToProject(student);
        modalInstance.result.then(function () {
            getStudents();
        }, function () {
            getStudents();
        });

    }

    function tryDigest() {
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }

    function getStudents(){
        $scope.students = userService.getStudents();
    }



    $scope.sortType ='lastname';
    $scope.reverse =true;
    $scope.order = function(reverse, sortType){
        $scope.sortType = sortType;
        $scope.reverse = reverse;
    }

    function getUniversities() {
        $scope.universities = commonsService.universities;
    }


});