const pool = require("../../Configs/dbConfig");

const getHod = async (req, res) => {
  try {
    const role = req.user.role;
    const userId = req.user.id;

    let query = "";
    let values = [];

    if (role === "admin") {
      query = `

        select 
        hods.id,
        hods.userId,
        hods.name,
        hods.mobile,
        hods.department,
        hods.designation,
        hods.experience,
        user.email
        from hods
        join user on hods.userId = user.id

        `;
    } else if (role === "hod") {
      query = `
        select 
        hods.id,
        hods.userId,
        hods.name,
        hods.mobile,
        hods.department,
        hods.designation,
        hods.experience,
        user.email
        from hods
        join user on hods.userId = user.id
        where hods.userId = ?



        `;
      values = [userId];
    } else {
      return res.status(403).json({
        status: "Failed",
        message: "Access Denied",
      });
    }

    const [getData] = await pool.query(query, values);

    // console.log("dbData", getData);

    res.status(200).json({ status: "Successs", message: "LOadede data", data: getData });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ status: "Failed", message: "server error" });
  }
};

module.exports = getHod;
