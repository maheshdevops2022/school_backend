const pool = require("../../Configs/dbConfig");


const editHods = async (req,res) => {
    try {
        const {id} = req.params;
        const {name,mobile,department,designation,experience} = req.body;

        const editQuery = "update hods set name = ?,mobile = ?,department = ?,designation = ?,experience = ?";

        const [editData] = await pool.query(editQuery, [
            name,
            mobile,
            department,
            designation,
            experience,
            id
        ]);
        res.status(200).json({status: "success", message: "edited"});
    } catch (error) {
        res.status(500).json({status: "failed", message: "server error"})

    }
}

module.exports = editHods;