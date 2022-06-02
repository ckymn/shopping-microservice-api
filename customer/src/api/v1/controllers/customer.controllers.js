const create = (req, res) => {
  res.status(200).send({
    status: "OK",
    message: "Customer is paid more money'",
  });
};

module.exports = {
  create,
};
