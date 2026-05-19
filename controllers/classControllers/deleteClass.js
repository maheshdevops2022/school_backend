const pool = require("../../Configs/dbConfig");


const deleteClasses = async (req,res) => {

    try {
    const {id } = req.params;

    const deleteData = "delete from classes where id =?";

    await pool.query(deleteData, [id]);

    res.status(200).json({status: "Success", message: "Deleted SUccessfully"});

    } catch (error) {
        console.log(error);
        res.status(400).json({status: "Failed", message: "Server Error"});
    }


}

module.exports = deleteClasses;