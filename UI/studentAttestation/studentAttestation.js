'use strict';

var StudentAttestationCtrl = angular.module('myApp.studentAttestation', ['ngRoute']);

StudentAttestationCtrl.controller('StudentAttestationCtrl', function ($scope, commonsService, userService) {

    $scope.adminUserTypeId = userService.adminUserTypeId;
    var userInt = setInterval(function(){
        if(userService.User) {
            $scope.loaded  = true;
            clearInterval(userInt)
            $scope.user = userService.User;
            getStudentsForEstimate();
            tryDigest();
        }
    },300)

    function tryDigest() {
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }

    $scope.studentsForEstimate = [];

    function getStudentsForEstimate(){
        $scope.studentsForEstimate = commonsService.studens;
    }

    $scope.approve = function(student){

    }

    $scope.sortType ='lastname';
    $scope.reverse =true;
    $scope.order = function(reverse, sortType){
        $scope.sortType = sortType;
        $scope.reverse = reverse;
    }



});