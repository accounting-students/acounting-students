'use strict';

var CompaniesCtrl = angular.module('myApp.companies', ['ngRoute']);

CompaniesCtrl.controller('CompaniesCtrl', function ($scope, commonsService, userService,companyService) {

    $scope.studentUserTypeId = userService.studentUserTypeId;

    var userInt = setInterval(function(){
        if(userService.User) {
            $scope.loaded  = true;
            clearInterval(userInt)
            $scope.user = userService.User;
            getCompanies();
            tryDigest();
        }
    },300)

    function tryDigest() {
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }

    function getCompanies(){
        $scope.companies = commonsService.companies;
    }

    $scope.showCompanyModal = function(company){
        var modalInstance = companyService.showCompanyModal(company);
    }

    $scope.sortType ='lastname';
    $scope.reverse =true;
    $scope.order = function(reverse, sortType){
        $scope.sortType = sortType;
        $scope.reverse = reverse;
    }


});