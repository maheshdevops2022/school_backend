const pool = require("../../Configs/dbConfig");
const bcrypt = require("bcrypt");

const addTeachers = async (req, res) => {
  try {
    const { email, password, name, surname, gender, mobile, subject, date, experience, salary } =
      req.body;

    // VALIDATION

    if (
      !email ||
      !password ||
      !name ||
      !surname ||
      !gender ||
      !mobile ||
      !subject ||
      !date ||
      !experience ||
      !salary
    ) {
      return res.status(400).json({
        status: "Failed",
        message: "All fields required",
      });
    }

    // CHECK EMAIL

    const checkEmail = "SELECT * FROM user WHERE email = ?";

    const [existingUser] = await pool.query(checkEmail, [email]);

    if (existingUser.length > 0) {
      return res.status(400).json({
        status: "Failed",
        message: "Email already exists",
      });
    }

    // HASH PASSWORD

    const hashedPassword = await bcrypt.hash(password, 10);

    // INSERT USER

    const userQuery = `
      INSERT INTO user
      (email, password, role)
      VALUES (?, ?, ?)
    `;

    const [userResult] = await pool.query(userQuery, [email, hashedPassword, "teacher"]);

    // USER ID

    const userId = userResult.insertId;

    // INSERT TEACHER DETAILS

    const teacherQuery = `
      INSERT INTO teachers
      (
        userId,
        name,
        surname,
        gender,
        mobile,
        subject,
        date,
        experience,
        salary
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.query(teacherQuery, [
      userId,
      name,
      surname,
      gender,
      mobile,
      subject,
      date,
      experience,
      salary,
    ]);

    res.status(200).json({
      status: "Success",
      message: "Teacher Added Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

module.exports = addTeachers;
