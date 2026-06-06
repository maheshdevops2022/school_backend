const pool = require("../../Configs/dbConfig");


const deleteStudents = async (req, res) => {
  try {
    const { id } = req.params;

    //get students details

    const [students] = await pool.query("select userId from students where id = ?", [id]);

    if (students.length === 0) {
      return res.status(400).json({ status: "Failed", message: "No Students Found" });
    }

    const userId = students[0].userId;

    await pool.query("delete from students where id = ?", [userId]);

    //delte login

    await pool.query("delete from user where id = ?", [userId]);

    res.status(200).json({
      status: "Success",
      message: "Student Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: "Failed",
      message: "Server Error",
    });
  }
};

module.exports = deleteStudents;
