const customerSchema = require("../models/customer.model");

const createService = async (data) => {
  const customerData = await new customerSchema(data);
  if (!customerData) {
    return false;
  } else {
    return customerData.save();
  }
};

module.exports = {
  createService,
};
