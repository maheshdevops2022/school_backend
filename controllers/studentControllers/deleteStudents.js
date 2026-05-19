const pool = require("../../Configs/dbConfig");

const deleteStudents = async (req, res) => {

  try {

    const { id } = req.params;

    const deleteQuery =
      "DELETE FROM students WHERE id = ?";

    await pool.query(deleteQuery, [id]);

    res.status(200).json({
      status: "Success",
      message: "Student Deleted Successfully"
    });

  }
  catch(error){

    console.log(error);

    res.status(500).json({
      status: "Failed",
      message: "Server Error"
    });

  }

};

module.exports = deleteStudents;





