const customerSchema = require("../models/customer.model");

const createService = async (data) => {
  const customerData = await new customerSchema(data);
  if (!customerData) {
    return false;
  } else {
    return customerData.save();
  }
};

const listService = async () => {
  const customers = await customerSchema.find({
    _id: "629915487061e72a0db60548",
  });
  if (!customers) {
    return false;
  } else {
    return customers;
  }
};

module.exports = {
  createService,
  listService,
};
