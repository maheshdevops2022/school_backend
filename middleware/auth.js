const jwt = require("jsonwebtoken");

exports.authorization = async (req, res, next) => {
  // console.log("AUTH HEADER:", req.header("Authorization"));

  const token = req.header("Authorization")?.split(" ")[1];

  // console.log("TOKEN:", token);

  if (!token) {
    return res.status(400).json({
      error: "Access denied no token provided",
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_TOKEN_KEY);

    // console.log("PAYLOAD:", payload);

    req.user = payload;
    next();
  } catch (error) {
    // console.log("JWT ERROR:", error.message);

    return res.status(400).json({
      error: "Invalid Token",
    });
  }
};

//auth midlare

exports.roleAuthorization = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: "Acces Denied",
      });
    }

    next();
  };
};
