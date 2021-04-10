var services = angular.module('myApp.services', ['ngRoute']);

services.factory('infoService', function ($uibModal, $sce) {
    var service = {};

    service.infoFunction = function (text, title) {
        var modalInstance = $uibModal.open({
            templateUrl: 'modalWindows/InfoModal/infoModal.html',
            controller: 'InfoModalWindowCtrl',
            windowClass: 'info-window-modal',
            size: 'size',
            resolve: {
                element: function () {
                    return text;
                },
                title: function () {
                    return title;
                }
            }
        });
    };

    service.openConfirmationModal = function (title, text) {
        var props = {
            animation: true,
            backdrop: 'static',
            keyboard: false,
            templateUrl: 'modalWindows/ConfirmationModal/confirmationModal.html',
            controller: 'ConfirmationModalCtrl',
            resolve: {
                title: function () {
                    return title;
                },
                text: function () {
                    return text;
                }
            }
        };

        return $uibModal.open(props);
    };

    service.getComment = function (comment) {
        if (comment) {
            comment = $sce.trustAsHtml(findAndReplaceLink(comment.replace(/\r\n|\r|\n/g, " <br /> ")));
            return comment;
        }
    }

    return service;
});

services.factory('datesService', function () {
    var service = {};

    service.getSmallMonth = function (date) {
        switch (date.getMonth()) {
            case 0:
                return "янв";
            case 1:
                return "фев";
            case 2:
                return "мар";
            case 3:
                return "апр";
            case 4:
                return "май";
            case 5:
                return "июн";
            case 6:
                return "июл";
            case 7:
                return "авг";
            case 8:
                return "сен";
            case 9:
                return "окт";
            case 10:
                return "ноя";
            case 11:
                return "дек";
        };
    };

    service.parseDateToStringSmall = function (date) {
        var date = new Date(date);
        var month = date.getMonth() + 1;
        month < 10 ? month = "0" + month : "";
        var day = date.getDate();
        day < 10 ? day = "0" + day : "";
        return day + '.' + month;
    };

    service.parseDateToStringRussian = function (date) {
        var date = new Date(date);
        var month = date.getMonth() + 1;
        month < 10 ? month = "0" + month : "";
        var day = date.getDate();
        day < 10 ? day = "0" + day : "";
        return day + '.' + month + '.' + date.getFullYear();
    };

    service.parseDateToString = function (date) {
        var date = new Date(date);
        var month = date.getMonth() + 1;
        month < 10 ? month = "0" + month : "";
        var day = date.getDate();
        day < 10 ? day = "0" + day : "";
        return date.getFullYear() + '-' + month + '-' + day;
    };

    service.getTimeStringByDate = function (date) {
        if (date) {
            var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
            var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
            var seconds = "00";
            return hours + ":" + minutes;
        };
        return null;
    };

    service.isEqualDates = function (date1, date2) {
        if (date1, date2) {
            var d1 = new Date(date1);
            var d2 = new Date(date2);
            if (d1.getFullYear() == d2.getFullYear() && d1.getMonth() == d2.getMonth() && d1.getDate() == d2.getDate()) {
                return true;
            };
        };
        return false;
    };

    service.isFirstDateBeforeSecondDate = function (date1, date2) {
        if (date1, date2) {
            var d1 = new Date(date1);
            d1.setHours(0);
            d1.setMinutes(0);
            d1.setSeconds(0);
            d1.setMilliseconds(0);
            var d2 = new Date(date2);
            d2.setHours(0);
            d2.setMinutes(0);
            d2.setSeconds(0);
            d2.setMilliseconds(0);
            if (d1.getTime() < d2.getTime()) {
                return true;
            };
        };
        return false;
    };

    service.getDateWithoutTime = function (date) {
        var d = new Date(date);
        d.setHours(0);
        d.setMinutes(0);
        d.setSeconds(0);
        d.setMilliseconds(0);
        return d;
    };

    service.getPrettyRussianDateStringByDate = function (date) {
        switch (date.getMonth()) {
            case 0:
                return date.getDate() + " января " + date.getFullYear();
            case 1:
                return date.getDate() + " февраля " + date.getFullYear();
            case 2:
                return date.getDate() + " марта " + date.getFullYear();
            case 3:
                return date.getDate() + " апреля " + date.getFullYear();
            case 4:
                return date.getDate() + " мая " + date.getFullYear();
            case 5:
                return date.getDate() + " июня " + date.getFullYear();
            case 6:
                return date.getDate() + " июля " + date.getFullYear();
            case 7:
                return date.getDate() + " августа " + date.getFullYear();
            case 8:
                return date.getDate() + " сентября " + date.getFullYear();
            case 9:
                return date.getDate() + " октября " + date.getFullYear();
            case 10:
                return date.getDate() + " ноября " + date.getFullYear();
            case 11:
                return date.getDate() + " декабря " + date.getFullYear();
        };
    };

    return service;
});

services.filter('orderObjectBy', function () {
    return function (items, field, reverse) {
        var filtered = [];
        var nullObjects = [];

        angular.forEach(items, function (item) {
            if (item[field]) filtered.push(item);
            else nullObjects.push(item);
        });

        filtered.sort(function (a, b) {
            return (a[field] > b[field] ? 1 : -1);
        });

        if (reverse) filtered.reverse();

        angular.forEach(nullObjects, function (item) {
            filtered.push(item);
        });

        return filtered;
    };
});

/*services.factory('mockData', function () {
    var service = {};

    service.UserData = [{
        Id:1, UserName: "Test User"
    }];

    return service;
}*/

services.factory('userService', function ($location, $http, $uibModal, $sce, $q, $rootScope ) {
    var service = {};

    service.defaultError = "Сервер недоступен. Неизвестная ошибка сервера";
    service.User = null;

    service.showUserProfile = function(){
        var props = {
            animation: true,
            backdrop: 'static',
            keyboard: false,
            templateUrl: 'modalWindows/AuthorizationModal/autorization.html',
            controller: 'AutorizationCtrl',
        };

        return $uibModal.open(props);
    }

    service.openAuthModal = function () {
        var props = {
            animation: true,
            backdrop: 'static',
            keyboard: false,
            templateUrl: 'modalWindows/AuthorizationModal/autorization.html',
            controller: 'AutorizationCtrl',
        };

        return $uibModal.open(props);
    };

    service.resolveCheck = function(){
        var defered = $q.defer();
        var user = JSON.parse(localStorage.getItem('User'));
        console.log(user)
        //var token = service.getCookieByName("token");
        //if(token){ //if user exits then retry login
            if(!user) {
                service.User = user;
                service.redirectTo("main");
                $rootScope.$broadcast('user:isActive', false);
                defered.resolve(false);
                //service.getUserByToken(token).then(function (response) {
                //    if (response && response.user) {
                //        service.User = response.user;
                //        $rootScope.$broadcast('user:isActive', true);
                //        defered.resolve(true);
                //    } else {
                //        service.User = null;
                //        service.redirectTo("login");
                //        $rootScope.$broadcast('user:isActive', true);
                //        console.log(response.message);
                //        defered.resolve(true);
                //    }
                //}, function () {
                //    service.User = null;
                //    service.redirectTo("login");
                //    $rootScope.$broadcast('user:isActive', true);
                //    defered.resolve(false);
                //});
            } else {
                service.User = user;
                $rootScope.$broadcast('user:isActive', true);
                defered.resolve(true);
            }
        //} else {
        //    service.redirectTo("login");
        //    $rootScope.$broadcast('user:isActive', true);
        //    defered.resolve(false);
        //}
        tryDigest();

        return defered.promise;
    }

    service.redirectTo = function(redirectTo){
        $location.path('/'+redirectTo);
        tryDigest()
    }

    service.setCookie = function(name,value,expiration){
        var expires = "";
        if (expiration) {
            var date = new Date(expiration);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/ ;"
        //document.cookie = name + "=" + (value || "")  + expires + "; path=/ ;domain=localhost";
    }

    service.getCookieByName  = function (name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
        else return null;
    }

    service.deleteTokenFromCookie  = function(){
        document.cookie = "token=''; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; ";
    }

    function tryDigest() {
        if (!$rootScope.$$phase) {
            $rootScope.$apply();
        }
    }

    /************************************* MODALS *************************************/

    service.addUserModal = function () {
        var modalInstance = $uibModal.open({
            backdrop: 'static',
            templateUrl: 'modalWindows/addUserModal/addUserModal.html',
            controller: 'AddUserModalCtrl',
            windowClass: 'info-window-modal',
            size: 'size'
        });

        return modalInstance.result;
    };

    service.editUserModal = function (user) {
        var modalInstance = $uibModal.open({
            backdrop: 'static',
            templateUrl: 'modalWindows/editUserModal/editUserModal.html',
            controller: 'EditUserModalCtrl',
            resolve: {
                user: function () {
                    return user;
                }
            }
        });
        return modalInstance.result;
    };

    /************************************* USER API *************************************/
    service.adminUserTypeId = 1;
    service.studentUserTypeId = 2;
    service.universityUserTypeId = 3;

    service.users = [
        {competenceList:[{"competenceName":"Pk1 - test 234",isChecked:false, mentorLastName:"Фамилия", mentorFirstName:"Имя"},{isChecked:true,"competenceName":"Pk2 - test 234", mentorLastName:"Фамилия", mentorFirstName:"Имя"}], github:"qwe234",telegram:"qwe234",gitlab:"qwe234",skype:"asd11da23asd",universityName:"КГУ",email:"4test@test123", "phone":"1111123", patronymic:"Ммтрович", address:"Кострома, ул.Советская д.120", mainSpecialty:"Разработчик", "login": "admin", "password": "admin", "firstName":"Федор", "lastName":"Михайлов", "userId":1, "userTypeId": service.adminUserTypeId},
        {competenceList:[{"competenceName":"Pk1 - test 234",isChecked:false, mentorLastName:"Фамилия", mentorFirstName:"Имя"},{isChecked:false,"competenceName":"Pk2 - test 234", mentorLastName:"Фамилия", mentorFirstName:"Имя"}], github:"eqwea",telegram:"qweqweqwe",gitlab:"q12312we234",skype:"qwe234",universityName:"КГТУ",email:"5test@test123", "phone":"125553", patronymic:"Ммтрович", address:"Кострома, ул.Советская д.120", mainSpecialty:"Тестировщик", "login": "university", "password": "university", "firstName":"Универ", "lastName":"Универыч", "userId":2, "userTypeId": service.universityUserTypeId},
        {competenceList:[{"competenceName":"Pk1 - test 234",isChecked:true, mentorLastName:"Фамилия", mentorFirstName:"Имя"},{isChecked:true,"competenceName":"Pk2 - test 234", mentorLastName:"Фамилия", mentorFirstName:"Имя"}], github:"asdasd",telegram:"qwe234",gitlab:"qwe234",skype:"qweasas",universityName:"Политех",email:"tes5t@test123", "phone":"123444", patronymic:"Ммтрович", address:"Кострома, ул.Советская д.120", mainSpecialty:"", "login": "student", "password": "student", "firstName":"Студент", "lastName":"Студентыч", "userId":3, "userTypeId": service.studentUserTypeId}
    ];

    service.getUserById = function (userId){
        var user = null;
        service.users.map(function (e) {
            if(e && e.userId && userId && e.userId == userId) user = JSON.parse(JSON.stringify(e))
        })
        return user;
    }

    service.getAllUsers = function () {

        return service.users;
        //var deferred = $q.defer();
        //$http.get(ipAdress + "/api/user/getAll").success(function (response) {
        //    deferred.resolve(response);
        //}).error(function (error) {
        //    deferred.reject(error);
        //});
        //return deferred.promise;
    }

    service.addUser = function (user) {
        var deferred = $q.defer();
        $http.post(ipAdress + "/api/user/add", user).success(function (response, headers) {
            //console.log(headers)
            deferred.resolve(response);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };

    service.editUser = function (user) {
        var deferred = $q.defer();
        $http.post(ipAdress + "/api/user/edit", user).success(function (response) {
            deferred.resolve(response);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };

    service.getUserByToken = function () {
        var deferred = $q.defer();
        $http.get(ipAdress + "/api/user/getUserByToken").success(function (response) {
            deferred.resolve(response);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };

    service.login = function (login, password) {
        var deferred = $q.defer();
        var response = {};
        var users = service.getAllUsers();
        var user = null;
        users.map(function (e) {
            if(e.login == login) user = e;
        });
        if(user && user.password == password) {
            service.User = JSON.parse(JSON.stringify(user));
            deferred.resolve(service.User);
        } else {
            response.message = "Неверно указан логин или пароль"
            deferred.reject(response);
        }
        return deferred.promise;
    };

    /************************************* USER ROLE API *************************************/

    service.getAllUserRoles = function () {
        var deferred = $q.defer();
        $http.get(ipAdress + "/api/user_roles/getAll").success(function (response) {
            deferred.resolve(response);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };

    return service;
});

myApp.factory('userProfile', function ($http, $window, $q) {

    var service = {};

    service.getUserInfo = function (userId) {
        var deferred = $q.defer();
        $http.get(ipAdress + "/api/user/getUserProfile?userId="+userId ).success(function (response) {
            deferred.resolve(response);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };

    return service;
});

myApp.factory('likeService', function ($http, $window, $q) {

    var service = {};

    service.addLike = function (projectId, likeTypeId) {
        var deferred = $q.defer();
        $http.get(ipAdress + "/api/like/add?projectId="+projectId+"&likeTypeId="+likeTypeId ).success(function (response) {
            deferred.resolve(response);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };

    return service;
});


myApp.factory('regionService', function ($http, $window, $q) {

    var service = {};

    service.getAllRegions = function () {
        var deferred = $q.defer();
        $http.get(ipAdress + "/api/region/getAll" ).success(function (response) {
            deferred.resolve(response);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };

    return service;
});

var bigText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magn aliqua. Ut enim ad minim veniam, " +
    "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore " +
    "eu fugiat nulla pariatur. Excepteu sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

myApp.factory('commonsService', function ($http, $window, $q) {

    var service = {};

    service.companies = [
        {description:bigText, dateStart:"12.01.2020", dateEnd:"12.01.2022", companyName:"ММТР Технологии", direction:"direction1"},
        {description:bigText, dateStart:"12.01.2020", dateEnd:"12.01.2022", companyName:"Наймикс", direction:"direction1Test"},
    ];

    service.universities = [
        {universityName:"test",universityId:1, specialties:["Разработчик","test2","test3"], free:21},
        {universityName:"test1",universityId:2, specialties:["test3","Тестировщик","test3"], free:51},
        {universityName:"test2",universityId:3, specialties:["test","test2","Аналитик"], free:15}
    ];

    service.studens = [
        {competenceList:['Умеет1','Умеет2','Умеет3'], studentId:1,name:"Вася Пупкин", specialty:"Разработчик", university:service.universities[0]},
        {competenceList:['Умеет1','Умеет2','Умеет3'], studentId:2,name:"Вася Пупкин 2", specialty:"Тестировщик", university:service.universities[1]},
        {competenceList:['Умеет1','Умеет2','Умеет3'], studentId:3,name:"Вася Пупкин 3", specialty:"Аналитик", university:service.universities[2]}
    ];

    service.projects = [
        {description:bigText, statusClass:"badge-success", projectStatus:"Принят", projectName:"Сделай то", dateStart:"12.01.2020", dateEnd:"12.01.2022", universityName:"КГУ",universityId:1},
        {description:bigText, statusClass:"badge-secondary", projectStatus:"В рассмотрении", projectName:"Сделай это", dateStart:"12.01.2020", dateEnd:"12.01.2021", universityName:"КГТУ",universityId:2},
        {description:bigText, statusClass:"badge-danger", projectStatus:"Отклонён", projectName:"И вот это",dateStart:"12.01.2020", dateEnd:"12.01.2023",  universityName:"ЯрДемид",universityId:3}
    ];

    return service;
});

myApp.factory('companyService', function ($http, $window, $q, $uibModal) {

    var service = {};

    service.showCompanyModal = function(company){
        var modalInstance = $uibModal.open({
            backdrop: 'static',
            templateUrl: 'modalWindows/ShowCompanyModal/showCompanyModal.html',
            controller: 'ShowCompanyCtrl',
            resolve:{
                company: function(){
                    return company;
                }
            }
        });
        return modalInstance.result;
    }

    return service;
});


myApp.factory('projectService', function ($http, $window, $q, $uibModal, commonsService) {

    var service = {};

    service.createNewProject = function(){
        var modalInstance = $uibModal.open({
            backdrop: 'static',
            templateUrl: 'modalWindows/CreateProjectModal/createProjectModal.html',
            controller: 'CreateProjectCtrl',
        });
        return modalInstance.result;
    }

    service.showProjectModal = function(project){
        var modalInstance = $uibModal.open({
            backdrop: 'static',
            templateUrl: 'modalWindows/ShowProjectModal/showProjectModal.html',
            controller: 'ShowProjectModalCtrl',
            resolve: {
                project: function () {
                    return project;
                }
            }
        });
        return modalInstance.result;
    }

    service.getAllKanbanStatuses = function () {
        var deferred = $q.defer();
        $http.get(ipAdress + "/api/kanban/getAll" ).success(function (response) {
            deferred.resolve(response);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };

    service.getAllProjects = function () {
        var deferred = $q.defer();
        $http.get(ipAdress + "/api/project/getAllProjects" ).success(function (response) {
            deferred.resolve(response);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };

    service.getProjectsByClassificator = function (classificatorId) {
        var deferred = $q.defer();
        $http.get(ipAdress + "/api/project/getProjectsByClassificator?classificatorId="+classificatorId ).success(function (response) {
            deferred.resolve(response);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };

    service.updateProjectStatus = function (projectId, projectStatusId) {
        var deferred = $q.defer();
        $http.get(ipAdress + "/api/project/updateProjectStatus?projectId="+projectId+"&projectStatusId="+projectStatusId ).success(function (response) {
            deferred.resolve(response);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };

    service.addProject = function (project) {
        project.statusClass = "badge-secondary";
        project.projectStatus = "В рассмотрении";
        var deferred = $q.defer();
        //$http.post(ipAdress + "/api/project/addProject", project).success(function (response) {
        commonsService.projects.push(project)
          deferred.resolve(true);
        //}).error(function (error) {
        //    deferred.reject(error);
        //});
        return deferred.promise;
    };

    service.getAllProjectClassificators = function () {
        var deferred = $q.defer();
        $http.get(ipAdress + "/api/project/getAllProjectClassificators").success(function (response) {
            deferred.resolve(response);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };

    service.addCommentToProject = function(comment){
        var deferred = $q.defer();
        $http.post(ipAdress + "/api/comment/add ", comment).success(function (response) {
            deferred.resolve(response);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }

    service.uploadFileToProject = function(file, projectId){
        var deferred = $q.defer();
        $http.post(ipAdress + "/api/document/upload?projectId="+projectId, file, {
                withCredentials: true,
                headers: {'Content-type': undefined},
                transformRequest: angular.identity
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }

    service.downloadFileByDocId = function(documentId){
        var deferred = $q.defer();
        $http.get(ipAdress + "/api/document/download?documentProjectId="+documentId).success(function (response) {
            deferred.resolve(response);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }


    service.getAllProjectDocument = function(projectId){
        var deferred = $q.defer();
        $http.get(ipAdress + "/api/document/getAllProjectDocument?projectId="+projectId).success(function (response) {
            deferred.resolve(response);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }


    service.getProjectByProjectId = function (projectId) {
        var deferred = $q.defer();
        $http.get(ipAdress + "/api/project/getProjectByProjectId?projectId="+projectId).success(function (response) {
            deferred.resolve(response);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };

    service.getProjectReportByProjectId = function (projectId) {
        var deferred = $q.defer();
        $http.get(ipAdress + "/api/project/generateReportByProjectId?projectId="+projectId).success(function (response) {
            deferred.resolve(response);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };

    service.getDashBoardStats = function () {
        var deferred = $q.defer();
        $http.get(ipAdress + "/api/dashboard/getProjects").success(function (response) {
            deferred.resolve(response);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };

    service.getClassificators = function (classificatorId) {
        var deferred = $q.defer();
        $http.get(ipAdress + "/api/dashboard/getClassificators?classificatorId="+classificatorId).success(function (response) {
            deferred.resolve(response);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };

    return service;
});

myApp.factory('mainService', function ($http, $window, $q) {

    var service = {};

    service.getTestRequest = function (data) {
        var deferred = $q.defer();
        $http.post(ipAdress + "/testPost", data).success(function (response) {
            deferred.resolve(response);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };

    return service;
});

function request($http, $q, method, url, func, service, data='') {
    var deferred = $q.defer();
    (data ? $http[method](ipAdress + url, data) : $http[method](ipAdress + url)).success(function (response) {
        deferred.resolve(response);
    }).error(function (error) {
        deferred.reject(error);
    });
    return deferred.promise;
}
