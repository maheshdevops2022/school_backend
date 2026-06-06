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
const { authorization, roleAuthorization } = require("../middleware/auth");
const upload = require("../middleware/multer");
const { uploadStudents } = require("../uploads/uploadStudents");
const { uploadTeachers } = require("../uploads/uploadTeachers");
const addHod = require("../controllers/hodControllers/addHod");
const getHod = require("../controllers/hodControllers/getHod");
const editHods = require("../controllers/hodControllers/editHod");
const deleteHods = require("../controllers/hodControllers/deleteHod");

const router = express.Router();

router.post("/addStudents", authorization, roleAuthorization("admin", "teacher"), addStudents);

router.get(
  "/getStudents",
  authorization,
  roleAuthorization("admin", "teacher", "student"),
  getStudents
);

router.put(
  "/updateStudents/:id",
  authorization,
  roleAuthorization("admin", "teacher"),
  editStudents
);

router.delete(
  "/deleteStudents/:id",
  authorization,
  roleAuthorization("admin", "teacher"),
  deleteStudents
);

//teachers

router.post("/addTeachers", authorization, roleAuthorization("admin"), addTeachers);

//admin+teacher
router.get("/getTeachers", authorization, roleAuthorization("admin", "teacher"), getTeachers);

//admin
router.put("/editTeachers/:id", authorization, roleAuthorization("admin"), editTeachers);
router.delete("/deleteTeachers/:id", authorization, roleAuthorization("admin"), deleteTeachers);

//classes

router.post("/addClasses", addClass);
router.get("/getClasses", getClass);
router.put("/editClasses/:id", updateClass);
router.delete("/deleteClasses/:id", deleteClasses);

//dashboard

router.get("/getDashboard", authorization, roleAuthorization("admin", "teacher"), getDashboard);

//csv upload

router.post("/uploadStudents", upload.single("file"), uploadStudents);
router.post("/uploadTeachers", upload.single("file"), uploadTeachers);

//hods

router.post("/addHods", authorization, roleAuthorization("admin"), addHod);
router.get("/getHods", authorization, roleAuthorization("admin", "hod"), getHod);
router.put("/editHods/:id", authorization, roleAuthorization("admin"), editHods);
router.delete("/deleteHods/:id", authorization, roleAuthorization("admin"), deleteHods);

module.exports = router;
