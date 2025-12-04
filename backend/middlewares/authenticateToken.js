require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({
      success: false,
      message: "No token provided. You must be logged in.",
    });

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({
          success: false,
          message: "Token is not valid or has expired.",
        });

    req.user = user;
    next();
  });
};
