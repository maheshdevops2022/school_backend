const pool = require("../../Configs/dbConfig");

const editTeachers = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, surname, gender, mobile, subject, date, experience, salary } = req.body;

    const updateTeachers =
      "UPDATE teachers SET name=?, surname=?, gender=?, mobile=?, subject=?, date=?, experience=?, salary=? WHERE id=?";

    await pool.query(updateTeachers, [
      name,
      surname,
      gender,
      mobile,
      subject,
      date,
      experience,
      salary,
      id
    ]);

    res.status(200).json({
      status: "Success",
      message: "Updated Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: "Failed",
      message: "Server Error",
    });
  }
};

module.exports = editTeachers;
