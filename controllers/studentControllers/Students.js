const pool = require("../../Configs/dbConfig");
const bcrypt = require("bcrypt");

const addStudents = async (req, res) => {
  try {

    const {
      email,
      password,
      name,
      surname,
      fathersname,
      studentsClass,
      mobile,
      village,
      gender
    } = req.body;

    // validation
    if (
      !email ||
      !password ||
      !name ||
      !surname ||
      !fathersname ||
      !studentsClass ||
      !mobile ||
      !village ||
      !gender
    ) {
      return res.status(400).json({
        status: "Failed",
        message: "All fields required"
      });
    }

    // check email
    const checkEmail = "SELECT * FROM user WHERE email = ?";
    const [existingUser] = await pool.query(checkEmail, [email]);

    if (existingUser.length > 0) {
      return res.status(400).json({
        status: "Failed",
        message: "Email already exists"
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert user
    const userQuery =
      "INSERT INTO user (email,password,role) VALUES (?,?,?)";

    const [userResult] = await pool.query(userQuery, [
      email,
      hashedPassword,
      "student"
    ]);

    const userId = userResult.insertId;

    // insert student
    const studentQuery = `
      INSERT INTO students
      (userId,name,surname,fathersname,studentsClass,mobile,village,gender)
      VALUES (?,?,?,?,?,?,?,?)
    `;

    await pool.query(studentQuery, [
      userId,
      name,
      surname,
      fathersname,
      studentsClass,
      mobile,
      village,
      gender
    ]);

    res.status(200).json({
      status: "Success",
      message: "Student Added Successfully"
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: "Failed",
      message: error.message
    });
  }
};

module.exports = addStudents;