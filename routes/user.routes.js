const express = require("express");
const addStudents = require("../controllers/Students");
const getStudents = require("../controllers/getStudents");
const editStudents = require("../controllers/updateStudents");
const deleteStudents = require("../controllers/deleteStudents");
const addTeachers = require("../controllers/teacherControllers/addTeacher");
const getTeachers = require("../controllers/teacherControllers/getTeacher");
const editTeachers = require("../controllers/teacherControllers/updateTeacher");
const deleteTeachers = require("../controllers/teacherControllers/deleteTeacher");

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

module.exports = router;