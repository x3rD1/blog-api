require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

exports.createRefreshToken = (payload) => {
  return jwt.sign({ sub: payload }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
