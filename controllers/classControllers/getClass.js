const pool = require("../../Configs/dbConfig");

const getClass = async (req, res) => {

  try {

    const getClassData = "SELECT * FROM classes";

    const [classData] = await pool.query(getClassData);

    res.status(200).json({
      status: "Success",
      message: "Classes fetched successfully",
      data: classData
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      status: "Failed",
      message: "Server Error"
    });

  }

};

module.exports = getClass;