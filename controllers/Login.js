const pool = require("../Configs/dbConfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const loginDetails = "SELECT id, email, password, role FROM user WHERE email = ?";

    const [loginDb] = await pool.query(loginDetails, [email]);

    // User exists?
    if (loginDb.length === 0) {
      return res.status(400).json({
        status: "Failed",
        message: "User not found",
      });
    }

    const user = loginDb[0];


    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        status: "Failed",
        message: "Password not correct",
      });
    }

    //jwt

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      "JWT_TOKEN_KEY",
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      status: "Success",
      message: "Login Successfully",
      token,
      userId: user.id,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: "Failed",
      message: "Server Error",
    });
  }
};

module.exports = userLogin;
