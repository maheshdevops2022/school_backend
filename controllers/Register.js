const pool = require("../Configs/dbConfig");

const userRegister = async (req, res) => {
  const { name, email, phone, password } = req.body;

  const registerDetails =
    "insert into user (name,email,phone,password) values (?,?,?,?)";

  const [registerDate] = await pool.query(registerDetails, [
    name,
    email,
    phone,
    password,
  ]);

  if (!registerDate.insertId) {
    return res.status(400).json({status: "Failed", message: "Failed To Register"});
  };
  res.status(200).json({status: "Success", message: "Registered SuccessFully"});
};

module.exports = userRegister;
