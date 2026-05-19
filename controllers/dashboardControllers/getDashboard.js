const pool = require("../../Configs/dbConfig");

const getDashboard = async (req, res) => {
  try {
    const [students] = await pool.query("select count (*) as totalStudents from students");

    const [teachers] = await pool.query("select count (*) as totalTeachers from teachers");

    const [classes] = await pool.query("select count (*) as totalClasses from classes");

    res.status(200).json({
      status: "success",
      message: "Data get SuccessFully",
      data: {
        totalStudents: students[0].totalStudents,
        totalTeachers: teachers[0].totalTeachers,
        totalClasses: classes[0].totalClasses,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Failed", message: "Server failure" });
  }
};

module.exports = getDashboard;
