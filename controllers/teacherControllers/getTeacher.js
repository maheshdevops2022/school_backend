const pool = require("../../Configs/dbConfig");

const getTeachers = async (req, res) => {

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
        where
        teachers.name LIKE ?
        or user.email LIKE ?
        or teachers.mobile LIKE ?

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
      select COUNT(*) as total
      from teachers
      join user on teachers.userId = user.id
      where
      teachers.name LIKE ?
      or user.email LIKE ?
      or teachers.mobile LIKE ?

      `;

      countValues = [
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,

      ];


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
    let total = data.length;

    if (role !== "teacher") {
      const [countData] = await pool.query(
        countQuery,
        countValues
      );

      total = countData[0].total;
    }



    res.status(200).json({
      status: "Success",
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

module.exports = getTeachers;








