const pool = require("../../Configs/dbConfig");

const getStudents = async (req, res) => {
  try {
    const role = req.user.role;
    const userId = req.user.id;

    let query = "";
    let values = [];

    // ADMIN → all students
    if (role === "admin") {
      query = `
        SELECT
          students.id,
          students.userId,
          students.name,
          students.surname,
          students.fathersname,
          students.studentsClass,
          students.mobile,
          students.village,
          students.gender,
          user.email
        FROM students
        JOIN user ON students.userId = user.id
      `;
    }

    // TEACHER → ALL students (VIEW ONLY)
    else if (role === "teacher") {
      query = `
        SELECT
          students.id,
          students.userId,
          students.name,
          students.surname,
          students.fathersname,
          students.studentsClass,
          students.mobile,
          students.village,
          students.gender,
          user.email
        FROM students
        JOIN user ON students.userId = user.id
      `;
    }

    // STUDENT → only own data
    else if (role === "student") {
      query = `
        SELECT
          students.id,
          students.userId,
          students.name,
          students.surname,
          students.fathersname,
          students.studentsClass,
          students.mobile,
          students.village,
          students.gender,
          user.email
        FROM students
        JOIN user ON students.userId = user.id
        WHERE students.userId = ?
      `;

      values = [userId];
    } else {
      return res.status(403).json({
        status: "Failed",
        message: "Access Denied",
      });
    }

    const [data] = await pool.query(query, values);

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

module.exports = getStudents;
