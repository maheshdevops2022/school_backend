const express = require("express");
const addTeachers = require("../controllers/teacherControllers/addTeacher");
const getTeachers = require("../controllers/teacherControllers/getTeacher");
const editTeachers = require("../controllers/teacherControllers/updateTeacher");
const deleteTeachers = require("../controllers/teacherControllers/deleteTeacher");
const addStudents = require("../controllers/studentControllers/Students");
const getStudents = require("../controllers/studentControllers/getStudents");
const editStudents = require("../controllers/studentControllers/updateStudents");
const deleteStudents = require("../controllers/studentControllers/deleteStudents");
const addClass = require("../controllers/classControllers/addClass");
const getClass = require("../controllers/classControllers/getClass");
const updateClass = require("../controllers/classControllers/updateClass");
const deleteClasses = require("../controllers/classControllers/deleteClass");
const getDashboard = require("../controllers/dashboardControllers/getDashboard");

const router = express.Router();

router.post("/addStudents", addStudents);

router.get("/getStudents", getStudents);

router.put("/updateStudents/:id", editStudents);

router.delete("/deleteStudents/:id", deleteStudents);

//teachers

router.post("/addTeachers", addTeachers);
router.get("/getTeachers", getTeachers);
router.put("/editTeachers/:id", editTeachers);
router.delete("/deleteTeachers/:id", deleteTeachers);

//classes 

router.post("/addClasses", addClass);
router.get("/getClasses", getClass);
router.put("/editClasses/:id", updateClass);
router.delete("/deleteClasses/:id", deleteClasses);

//dashboard

router.get("/getDashboard", getDashboard);

module.exports = router;