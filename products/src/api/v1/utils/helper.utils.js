require("dotenv").config();
const cryptoJs = require("crypto-js");

module.exports = passwordToHash = (password) => {
  return cryptoJs.HmacSHA256(
    password,
    cryptoJs.HmacSHA1(password, process.env.SALT).toString()
  );
};
