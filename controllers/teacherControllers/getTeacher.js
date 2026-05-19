const pool = require("../../Configs/dbConfig");

const getTeachers = async (req,res) => {
    try {

        const getData = "select * from teachers";
        const [teachers] = await pool.query(getData);

        res.status(200).json({status:"success", message: "Get Teachers", data: teachers})


    } catch (error) {
        console.log(error)
        res.status(500).json({status:"failed", messsage: "server Error"})
    }
}

module.exports = getTeachers;