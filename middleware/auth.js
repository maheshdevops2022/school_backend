const jwt = require("jsonwebtoken");

exports.authorization = async (req,res,next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(400).json({error: "Access denied no token provided"});

    try {
        const payload = await jwt.verify(token, process.env.JWT_TOKEN_KEY);
        req.user = payload;
        next();
    } catch (error) {
        return res.status(400).json({error: "Invalid Token"});
    }
};


//auth midlare 

exports.roleAuthorization = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                error: "Acces Denied"
            })
        }

        next();
    }
}