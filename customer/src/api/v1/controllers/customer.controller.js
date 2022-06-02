const { createService } = require("../services/customer.service");
const httpStatus = require("http-status");

const createController = async (req, res) => {
  const { body } = req;
  try {
    const customer = await createService(body);
    if (!customer) {
      res.status(httpStatus.BAD_REQUEST).send({
        status: "FAILED",
        data: { error: "Data save problems" },
      });
    } else {
      res.status(httpStatus.CREATED).send({
        status: "OK",
        data: customer,
      });
    }
  } catch (error) {
    res.status(error?.status || httpStatus.INTERNAL_SERVER_ERROR).send({
      status: "FAILED",
      data: { error: error?.message || error },
    });
  }
};

module.exports = {
  createController,
};
