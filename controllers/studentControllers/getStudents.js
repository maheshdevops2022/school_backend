const pool = require("../../Configs/dbConfig");

const getStudents = async (req, res) => {
  try {
    const role = req.user.role;
    const userId = req.user.id;

    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";

    const offset = (page - 1) * limit;

    let query = "";
    let countQuery = "";
    let values = [];
    let countValues = [];

    if (role === "admin" || role === "teacher") {

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
        WHERE
          students.name LIKE ?
          OR user.email LIKE ?
          OR students.mobile LIKE ?
        LIMIT ? OFFSET ?
      `;

      values = [
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        limit,
        offset,
      ];

      countQuery = `
        SELECT COUNT(*) AS total
        FROM students
        JOIN user ON students.userId = user.id
        WHERE
          students.name LIKE ?
          OR user.email LIKE ?
          OR students.mobile LIKE ?
      `;

      countValues = [
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
      ];
    }

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
    }

    else {
      return res.status(403).json({
        status: "Failed",
        message: "Access Denied",
      });
    }

    const [data] = await pool.query(query, values);

    let total = data.length;

    if (role !== "student") {
      const [countData] = await pool.query(
        countQuery,
        countValues
      );

      total = countData[0].total;
    }

    res.status(200).json({
      status: "success",
      data,
      page,
      total,
      totalPages: Math.ceil(total / limit),
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