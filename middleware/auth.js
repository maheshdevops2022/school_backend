const jwt = require("jsonwebtoken");

exports.authorization = async (req,resizeBy,next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(400).json({error: "Access denied no token provided"});

    try {
        const payload = await jwt.verify(token, process.env.JWT_TOKEN_KEY);
        req.user = payload;
        next();
    } catch (error) {
        return res.status(400).json({error: "Invalid Token"});
    }
}