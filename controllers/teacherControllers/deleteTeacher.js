const pool = require("../../Configs/dbConfig");

const deleteTeachers = async (req, res) => {

  try {

    const { id } = req.params;

    const deleteQuery =
      "DELETE FROM teachers WHERE user_id = ?";

    await pool.query(deleteQuery, [user_id]);

    res.status(200).json({
      status: "Success",
      message: "Teachers Deleted Successfully"
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

module.exports = deleteTeachers;





