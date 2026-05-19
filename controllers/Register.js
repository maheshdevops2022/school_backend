const pool = require("../Configs/dbConfig");
const bcrypt = require("bcryptjs");

const userRegister = async (req, res) => {
  const { name, email, phone, password } = req.body;

  const hashedPassword = await bcrypt.hash(password,10);

  const registerDetails =
    "insert into user (name,email,phone,password) values (?,?,?,?)";

  const [registerDate] = await pool.query(registerDetails, [
    name,
    email,
    phone,
    hashedPassword,
  ]);

  if (!registerDate.insertId) {
    return res.status(400).json({status: "Failed", message: "Failed To Register"});
  };
  res.status(200).json({status: "Success", message: "Registered SuccessFully"});
};

module.exports = userRegister;
