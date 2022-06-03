const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1] || null;

  if (token === null) {
    return res.status(httpStatus.UNAUTHORIZED).send({
      status: "FAILED",
      data: { error: "Fistly you have to login" },
    });
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(httpStatus.FORBIDDEN).send({
          status: "FAILED",
          data: { error: error?.message },
        });
      } else {
        req.user = decoded;
        return next();
      }
    });
  }
};

module.exports = authenticateToken;
