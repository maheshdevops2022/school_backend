const pool = require("../../Configs/dbConfig");

const deleteHods = async (req, res) => {
  try {
    const { id } = req.params;

    //get hod details

    const [hods] = await pool.query("select userId from hods where id = ?", [id]);

    if (hods.length > 0) {
      return res.status(400).json({ status: "Failed", message: "No Students Found" });
    }

    const userId = hods[0].userId;

    //delete hods

    await pool.query("delete from hods where id = ?", [userId]);

    //delete login

    await pool.query("delete from user where id = ?", [userId]);

    res.status(200).json({ status: "Success", message: "Delete Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Failed", message: "Seerver Error" });
  }
};

module.exports = deleteHods;
