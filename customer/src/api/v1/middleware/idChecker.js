const ApiError = require("../errors/ErrorHandler");

const idChecker = (filed) => (req, res, next) => {
  if (!req?.params[filed || "id"]?.match(/^[0-9a-fA-F]{24}$/)) {
    return next(new ApiError("Invalid mongoose Id", 400));
  }
  next();
};

module.exports = idChecker;
