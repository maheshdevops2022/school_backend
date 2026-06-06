const pool = require("../../Configs/dbConfig");

const getDashboard = async (req, res) => {
  try {

    // TOTAL STUDENTS
    const [students] = await pool.query(`
      SELECT COUNT(*) AS totalStudents
      FROM students
    `);

    // TOTAL CLASSES
    const [classes] = await pool.query(`
      SELECT COUNT(*) AS totalClasses
      FROM classes
    `);

    // TOTAL TEACHERS
    const [teachers] = await pool.query(`
      SELECT COUNT(*) AS totalTeachers
      FROM teachers
    `);

    res.status(200).json({
      status: "success",
      message: "Dashboard Data Fetched Successfully",
      data: {
        totalStudents: students[0].totalStudents || 0,
        totalTeachers: teachers[0].totalTeachers || 0,
        totalClasses: classes[0].totalClasses || 0,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      status: "Failed",
      message: error.message,
    });

  }
};

module.exports = getDashboard;