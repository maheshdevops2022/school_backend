const pool = require("../Configs/dbConfig");

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const loginDetails =
      "SELECT id, email, password FROM user WHERE email = ?";

    const [loginDb] = await pool.query(loginDetails, [email]);

    // User exists?
    if (loginDb.length === 0) {
      return res.status(400).json({
        status: "Failed",
        message: "User not found"
      });
    }

    const user = loginDb[0];

    // Password check
    if (password !== user.password) {
      return res.status(400).json({
        status: "Failed",
        message: "Password not correct"
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Login Successfully",
      userId: user.id
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: "Failed",
      message: "Server Error"
    });
  }
};

module.exports = userLogin;