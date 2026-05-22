const pool = require("../../Configs/dbConfig");

const deleteTeachers = async (req, res) => {
  try {
    const { id } = req.params;

    //get Teacher details

    const [teachers] = await pool.query("select userId from teachers where id = ?", [id]);

    if (teachers.length === 0) {
      return res.status(400).json({ status: "Failed", message: "No Teachers Found" });
    }

    const userId = teachers[0].userId;

    await pool.query("delete from teachers where id = ?", [userId]);

    //delete login

    await pool.query("delete from user where id = ?", [userId]);

    res.status(200).json({
      status: "Success",
      message: "Teachers Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: "Failed",
      message: "Server Error",
    });
  }
};

module.exports = deleteTeachers;
