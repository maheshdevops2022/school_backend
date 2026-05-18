const pool = require("../Configs/dbConfig");

const addStudents = async (req, res) => {
  try {
    const { name, surname, fathersname, class: studentClass, mobile, village, gender } = req.body;

    const registerStudents =
      "insert into students (name,surname,fathersname,class,mobile,village,gender) values(?,?,?,?,?,?,?)";

    const studentsData = await pool.query(registerStudents, [
      name,
      surname,
      fathersname,
      studentClass,
      mobile,
      village,
      gender,
    ]);

    res.status(200).json({
      status: "Success",

      message: "Students Added SuccessFully",
    });
  } catch (error) {
    res.status(500).json({ status: "Failed", message: "Students Not Added" });
  }
};


module.exports = addStudents;