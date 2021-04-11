
var ShowProjectModalCtrl = angular.module('myApp.showProject', ['ngRoute', 'ui.bootstrap']);

ShowProjectModalCtrl.controller('ShowProjectModalCtrl', function ($scope, $uibModalInstance, project, userService, commonsService, projectService) {


    var userInt = setInterval(function(){
        if(userService.User) {
            $scope.loaded  = true;
            clearInterval(userInt)
            $scope.user = userService.User;
            tryDigest();
        }
    },300);

    function tryDigest() {
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }
    $scope.studentModel = null;
    $scope.role = null;
    //var studentDefault = {studentId:null, lastName:"Выберите студента" , firstName:""};
    $scope.students = [];
    $scope.students = JSON.parse(JSON.stringify(userService.getStudents()));
    //$scope.students.unshift(studentDefault);
    //$scope.student = studentDefault.lastName+ ' ' + studentDefault.firstName;

    //var roleDefault = {roleId:null, roleName:"Выберите роль"};
    $scope.roles = [];
    $scope.roles = JSON.parse(JSON.stringify(commonsService.roles));
    //$scope.roles.unshift(roleDefault)
    //$scope.role = $scope.roles[0].roleName;

    $scope.universityUserTypeId = userService.universityUserTypeId;
    $scope.project = project;

    getProjectStudents();

    function getProjectStudents(){
        projectService.getProjectStudents($scope.project.projectId).then(function (students) {
            $scope.project.students = students.projectStudents
        });
    }

    $scope.addStudentToProject = function(students, role, student){
        students.push({name:student , role:role});
        $scope.isAddStudent = false;
    }

    $scope.rejectAddStudentToProject = function(){
        $scope.isAddStudent = false;
    }


    $scope.approveProject = function (){

    }

    $scope.rejectProject = function(){

    }


    $scope.close = function () {
        close();
    };

    function  close(){
        $uibModalInstance.close();
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});