const pool = require("../../Configs/dbConfig");

const getTeachers = async (req, res) => {

  try {

    const role = req.user.role;
    const userId = req.user.id;

    let query = "";
    let values = [];

    // ADMIN → all teachers

    if (role === "admin") {

      query = `
        SELECT
          teachers.id,
          teachers.userId,
          user.email,
          teachers.name,
          teachers.surname,
          teachers.gender,
          teachers.mobile,
          teachers.subject,
          teachers.date,
          teachers.experience,
          teachers.salary
        FROM teachers
        JOIN user
        ON teachers.userId = user.id
      `;
    }

    // TEACHER → own details only

    else if (role === "teacher") {

      query = `
        SELECT
          teachers.id,
          teachers.userId,
          user.email,
          teachers.name,
          teachers.surname,
          teachers.gender,
          teachers.mobile,
          teachers.subject,
          teachers.date,
          teachers.experience,
          teachers.salary
        FROM teachers
        JOIN user
        ON teachers.userId = user.id
        WHERE teachers.userId = ?
      `;

      values = [userId];
    }

    const [data] = await pool.query(query, values);

    res.status(200).json({
      status: "Success",
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

module.exports = getTeachers;








