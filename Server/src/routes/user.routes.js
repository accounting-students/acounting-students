const {Router} = require('express');
const jwt = require('jsonwebtoken');
import {db, getFromConfig, wrapResponse, wrapAccess, handleDefault, handleInternal} from '../utils';
import auth from '../middleware/auth.middleware';
import access from './../access';
const router = Router();



router.get(
   '/get_all_projects',
   (request, response) =>
      request.pool
         .query("SELECT * FROM projects;")
         .then(db.getAll)
         .then((result) => response.json({ projects: result }))
         .catch((e) => handleDefault(e, response))
);

router.get(
   '/get_all_users',
   (request, response) => 
      request.pool
         .query("SELECT * FROM users;")
         .then(db.getAll)
         .then((result) => response.json({ users: result }))
         .catch((e) => handleDefault(e, response))
);

router.get(
   '/get_comp',
   (request, response) => 
      request.pool
         .query('SELECT * FROM "cList" WHERE "userID" = ' + request.query.userID + ';')
         .then(db.getAll)
         .then((result) => response.json({ competentions: result }))
         .catch((e) => handleDefault(e, response))
);

router.get(
   '/get_all_companies',
   (request, response) => 
      request.pool
         .query('SELECT * FROM company')
         .then(db.getAll)
         .then((result) => response.json({ companies: result }))
         .catch((e) => handleDefault(e, response))
);

router.get(
   '/get_all_requests',
   (request, response) => 
      request.pool
         .query('SELECT * FROM "studentsRequests"')
         .then(db.getAll)
         .then((result) => response.json({ requests: result }))
         .catch((e) => handleDefault(e, response))
);

router.get(
   '/get_all_project_students',
   (request, response) => 
      request.pool
         .query('SELECT * FROM "projectStudents"')
         .then(db.getAll)
         .then((result) => response.json({ projectStudents: result }))
         .catch((e) => handleDefault(e, response))
);

router.get(
   '/add_student_request',
   (request, response) => 
      request.pool
         .query('INSERT INTO "studentsRequests" ("studentID", "companyID") VALUES('+ request.query.studentID +','+ request.query.companyID +')')
         .then(db.getAll)
         .then((result) => response.json({ studentsRequests: result }))
         .catch((e) => handleDefault(e, response))
);

router.get(
   '/get_all_university',
   (request, response) => 
      request.pool
         .query('SELECT * FROM university')
         .then(db.getAll)
         .then((result) => response.json({ university: result }))
         .catch((e) => handleDefault(e, response))
);

router.get(
   '/get_project_students',
   (request, response) => 
      request.pool
         .query('SELECT id, "studentID", "studentRole" as "role", "projectID", concat("lastName" , \' \', "firstName") as name FROM "projectStudents" INNER JOIN users ON "projectStudents"."studentID" = "users"."userId" WHERE "projectID" = ' + request.query.projectID + '')
         .then(db.getAll)
         .then((result) => response.json({ projectStudents: result }))
         .catch((e) => handleDefault(e, response))
);

router.get(
   '/add_student_on_project',
   (request, response) => 
      request.pool
         .query('INSERT INTO "projectStudents" ("studentID", "studentRole", "projectID") VALUES (' + request.query.studentID + ', ' + '\'' + request.query.studentRole + '\'' + ', ' + request.query.projectID + ')')
         .then(db.getAll)
         .then((result) => response.json({ studentProjects: result }))
         .catch((e) => handleDefault(e, response))
);


module.exports = router;
