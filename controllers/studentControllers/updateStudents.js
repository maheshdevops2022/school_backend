const pool = require("../../Configs/dbConfig");

const editStudents = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      name,
      surname,
      fathersname,
      class: studentClass,
      mobile,
      village,
      gender
    } = req.body;

    const updateStudents =
      "UPDATE students SET name=?, surname=?, fathersname=?, class=?, mobile=?, village=?, gender=? WHERE id=?";

    await pool.query(updateStudents, [
      name,
      surname,
      fathersname,
      studentClass,
      mobile,
      village,
      gender,
      id
    ]);

    res.status(200).json({
      status: "Success",
      message: "Updated Successfully"
    });

  }
  catch (error) {

    console.log(error);

    res.status(500).json({
      status: "Failed",
      message: "Server Error"
    });

  }

};

module.exports = editStudents;