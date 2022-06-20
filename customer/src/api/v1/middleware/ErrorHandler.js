const Errorhandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    data: {
      error: err.message || "Internal Server Error...",
    },
  });
};

module.exports = Errorhandler;
