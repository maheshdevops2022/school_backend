const pool = require("../../Configs/dbConfig");

const addClass = async (req, res) => {
  try {
    const { className, teacher, boys, girls } = req.body;

    //check duplicate

    const checkQuery = "select * from classes where class_name = ?";

    const [existingClass] = await pool.query(checkQuery, [className]);

    if (existingClass.length > 0) {
      return res.status(400).json({ status: "Failed", message: "Existing classes already" });
    }

    const totalStudents = Number(boys) + Number(girls);

    const classDetails =
      "insert into classes (class_name,teacher,boys,girls,total_students) values(?,?,?,?,?)";

    const addDetails = await pool.query(classDetails, [
      className,
      teacher,
      boys,
      girls,
      totalStudents,
    ]);

    res.status(200).json({ status: "Success", message: "Classes Data Get" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Failed", message: "Server Error" });
  }
};

module.exports = addClass;
