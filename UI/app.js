'use strict';
var ipAdress;
// FOR LOCAL USAGE
var serverUrlIndex = 0;

setIpAddress();

function setIpAddress() {
    if (serverUrlIndex == 0) ipAdress = "http://168.63.58.52:8081";
    //local
    if (serverUrlIndex == 1) ipAdress = "http://127.0.0.1:8081";
};

var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ui.select', 'myApp.services', 'myApp.confirmationModal',
    'myApp.infoModal',  'myApp.mainPage', 'myApp.userProfile', 'myApp.addUserModalModal', 'myApp.editUserModalModal',  'myApp.project',
    'myApp.AutorizationModal', 'myApp.createProject', 'myApp.showProject', 'myApp.universities', 'myApp.students', 'myApp.userProfile', 'myApp.companies',
    'myApp.showCompany', 'myApp.studentAttestation' ]);


myApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});

myApp.factory('authInterceptor', function ($rootScope, $q) {

    var service = {};

    service.request = function (config) {
        config.headers = config.headers || {};
        //валидация пользователя (проверка авторизации) по хэдеру Authorization
        //if(getCookieByName("token") != undefined) config.headers.Authorization = getCookieByName("token");
        return config;
    };

    return service;
});

function getCookieByName(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
    else return null;
}

myApp.config(function ($routeProvider) {


    var UserResolve = {
        authorizeCheck: function(userService) {
            //валидация пользователя (проверка авторизации)
            return userService.resolveCheck();
        }
    };

    $routeProvider
        .otherwise({
            redirectTo: '/notFound404'
        })
        .when('/', {
            redirectTo: '/main'
        })
        .when('/main', {
            templateUrl: 'mainPage/mainPage.html',
            controller: 'MainPageCtrl',
            resolve: UserResolve
        })
        .when('/notFound404', {
            templateUrl: 'notFound404/404.html',
        })
        .when('/projects', {
            templateUrl: 'projects/projects.html',
            controller: 'ProjectCtrl',
            resolve: UserResolve
        })
        .when('/chat', {
            templateUrl: 'chat/chat.html',
            controller: 'ChatCtrl',
            resolve: UserResolve
        })
        .when('/createProject', {
            templateUrl: 'createProject/createProject.html',
            controller: 'CreateProjectCtrl',
            resolve: UserResolve
        })
        .when('/universities', {
            templateUrl: 'universities/universities.html',
            controller: 'UniversitiesCtrl',
            resolve: UserResolve
        })
        .when('/students', {
            templateUrl: 'students/students.html',
            controller: 'StudentsCtrl',
            resolve: UserResolve
        })
        .when('/users', {
            templateUrl: 'users/users.html',
            controller: 'UsersCtrl',
            resolve: UserResolve
        })
        .when('/profile', {
            templateUrl: 'userProfile/userProfile.html',
            controller: 'UserProfileCtrl',
            resolve: UserResolve
        })
        .when('/companies', {
            templateUrl: 'companies/companies.html',
            controller: 'CompaniesCtrl',
            resolve: UserResolve
        })
        .when('/results', {
            templateUrl: 'studentAttestation/studentAttestation.html',
            controller: 'StudentAttestationCtrl',
            resolve: UserResolve
        })
});

myApp.controller('CopyrightDateCtrl', function ($scope, dateFilter) {
    $scope.date = new Date();
    $scope.$watch('date', function (date)
    {
        $scope.dateString = dateFilter(date, 'yyyy');
    });
});

myApp.controller('UserCtrl', function ($scope, $rootScope, userService) { //это контроллер , он ставится в шаблоне html ng-controller="UserCtrl" - и отвечает за видимость внутри вложенных dom элементов старницы

    $scope.adminUserTypeId = userService.adminUserTypeId;
    $scope.studentUserTypeId = userService.studentUserTypeId;
    $scope.universityUserTypeId = userService.universityUserTypeId;

    $scope.isToggled = true;
    $scope.selectedPage = null;
    $scope.user = userService.User;

    tryDigest();
    $scope.$on('user:isActive', function() {
        if(userService.User){
            $scope.user = userService.User;
            $scope.isAuthorized = true;
            console.log($scope.user)
        }
        tryDigest();
    });

    $scope.openDD = function (selectedTab) {
        $('#' + selectedTab + 'Li .dropdown-menu').css({
            'display': 'unset'
        });
        $('#' + selectedTab + 'Li .dropdown-menu').show(0);
        $('.dropdown:hover .dropdown-menu').slideDown(0);
    };
    function tryDigest() {
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }
    $scope.closeDropDown = function () {
        $('.dropdown-menu').slideUp(0);
    }
    $scope.logOut = function(){
        $scope.selectedPage = null;
        $scope.isAuthorized = false;
        delete localStorage.User;
        //userService.deleteTokenFromCookie();
         $scope.user = $rootScope.user = null;
         userService.redirectTo("main")
         tryDigest();
    };

    $scope.logIn = function(){

        var modalInstance = userService.openAuthModal();
        modalInstance.result.then(function (response) {
            if(userService.User) {
                $scope.user = userService.User;
                $scope.isAuthorized = true;
            }

        }, function () {});

    }

    $scope.setSelectedTabInTab = function (value) {
        $scope.selectedTabInTab = value;
        $scope.openDropDowns = false;
        $('.dropdown-menu').stop().slideUp(0);
        closeNavButton();
    };

    $scope.closeNavButton = function () {
        closeNavButton();
    };

    function closeNavButton() {
        var navButton = $('#navButton');
        if (navButton && navButton[0] && navButton[0].offsetParent) {
            $('#navButton').click();
        };
    };

    $scope.getCurrentYear = function () {
        return new Date().getFullYear();
    }

    $scope.isUserAuthorized = function(){
        return isAuthorized();
    }

    function isAuthorized(){
        return $scope.isAuthorized;
        //todo check auth
    }

});

myApp.filter('notNull', function () {
    return function (input) {
        if (input && input.search('null') != -1) {
            input = input.replace('null', '');
        }
        return input;
    }
});