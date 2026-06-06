const pool = require("../../Configs/dbConfig");
const bcrypt = require("bcrypt");

const addHod = async (req, res) => {
  try {
    const { email, password, name, mobile, department, designation, experience } = req.body;

    //validation

    if (!email || !password || !name || !mobile || !department || !designation || !experience) {
      return res.status(400).json({ status: "Failed", message: "Required All Fields" });
    }

    //check email

    const checkEmail = "select * from user where email = ?";

    const [existingUser] = await pool.query(checkEmail, [email]);

    if (existingUser.length > 0) {
      return res.status(400).json({ status: "Failed", message: "Email already Exists" });
    }

    //haeshePassword

    const hashedPassword = await bcrypt.hash(password, 10);

    //enter into user

    const userQuery = "insert into user (email,password,role) values (?,?,?)";

    const [userResult] = await pool.query(userQuery, [email, hashedPassword, "hod"]);

    const userId = userResult.insertId;

    const hodQuery =
      "insert into hods (userId,name,mobile,department,designation,experience) values (?,?,?,?,?,?)";

    const [hodsData] = await pool.query(hodQuery, [
      userId,
      name,
      mobile,
      department,
      designation,
      experience,
    ]);

    res.status(200).json({ status: "Success", message: "Success full added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Failed", message: "Error" });
  }
};

module.exports = addHod;
