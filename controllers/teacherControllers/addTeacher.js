const pool = require("../../Configs/dbConfig");
const bcrypt = require("bcrypt");

const addTeachers = async (req, res) => {
  try {
    const { email, password, name, surname, gender, mobile, subject, date, experience, salary } =
      req.body;

    //check email exists

    const checkEmail = "select * from user where email = ?";

    const [existingUser] = await pool.query(checkEmail, [email]);

    if (existingUser.length > 0) {
      res.status(400).json({ status: "Failed", message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //insert into usertable

    const userQuery = "insert into user (email, password, role) values (?, ?, ?)";

    const [userResult] = await pool.query(userQuery, [email, password, "teacher"]);

    //get user id

    const userId = userResult.insertId;

    const teachers =
      "insert into teachers (name,surname,gender,mobile,subject,date,experience,salary) values(?,?,?,?,?,?,?,?)";

    const teachersData = await pool.query(teachers, [
      name,
      surname,
      gender,
      mobile,
      subject,
      date,
      experience,
      salary,
    ]);

    res.status(200).json({ status: "Success", message: "Added Teachers" });
  } catch (error) {
    res.status(500).json({ status: "Failed", message: "Server Error" });
  }
};

module.exports = addTeachers;
