const pool = require("../../Configs/dbConfig");

const getTeachers = async (req, res) => {

  try {

    let query = "";
    let values = [];

    // admin
    if (req.user.role === "admin") {

      query = "SELECT * FROM teachers";

    }

    // teacher
    else if (req.user.role === "teacher") {

      query =
        "SELECT * FROM teachers WHERE user_id = ?";

      values = [req.user.id];
    }

    const [teachers] = await pool.query(
      query,
      values
    );

    res.status(200).json({
      status: "success",
      message: "Get Teachers",
      data: teachers,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      status: "failed",
      message: "Server Error",
    });
  }
};

module.exports = getTeachers;