'use strict';

var StudentAttestationCtrl = angular.module('myApp.studentAttestation', ['ngRoute']);

StudentAttestationCtrl.controller('StudentAttestationCtrl', function ($scope, commonsService, userService) {


    var userInt = setInterval(function(){
        if(userService.User) {
            $scope.loaded  = true;
            clearInterval(userInt)
            $scope.user = userService.User;
            getStudents();
            tryDigest();
        }
    },300)

    function tryDigest() {
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }

    function getStudents(){
        $scope.students = commonsService.studens;
    }

    $scope.showUserProfile = function(){
        var modalInstance = userService.showUserProfile();
        modalInstance.result.then(function (response) {
        }, function () {});
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