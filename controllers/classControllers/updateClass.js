const pool = require("../../Configs/dbConfig");

const updateClass =  async (req, res) => {

    try {
  const { id } = req.params;

  const { className, teacher, boys, girls } = req.body;


  const editClass = "update classes set class_name=?, teachers=?, boys=?, girls=?, total_students=?";
const editQuery = await pool.query(editClass,[
    className,
    teacher,
    boys,
    girls,
    id

])
res.status(200).json({status:"success", message: "Succesfully edited"});
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "Failed", message: "Server Error"});

    }
};

module.exports = updateClass;
