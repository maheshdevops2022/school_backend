const pool = require("../../Configs/dbConfig");

const addTeachers = async (req, res) => {
  try {
    const { name, surname, gender, mobile, subject, date, experience, salary } = req.body;

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
