const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
    expiresIn: "1w",
  });
};
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
