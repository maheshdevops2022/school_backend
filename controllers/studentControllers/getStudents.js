const pool = require("../../Configs/dbConfig");

const getStudents = async (req, res) => {

    try {
    const getData = "select * from students";

    const [students] = await pool.query(getData);

    res.status(200).json(students)
    } catch(error) {
        re.status(500).json({status: "Failed", message:"Server Error"})
    }
}

module.exports = getStudents;