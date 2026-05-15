const express = require("express");
const userLogin = require("../controllers/Login");
const userRegister = require("../controllers/Register");

const router = express.Router();




router.post("/login", userLogin);
router.post("/register", userRegister);


module.exports = router;