const customerSchema = require("../models/customer.model");
const passwordToHash = require("../utils/helper.utils");

const createService = async (data) => {
  const customerData = await new customerSchema(data);
  if (!customerData) {
    return false;
  } else {
    return customerData.save();
  }
};

const loginService = async (data) => {
  const password = passwordToHash(data.password).toString();

  const customerData = await customerSchema.findOne({
    $and: [{ email: data.email }, { password }],
  });
  if (!customerData) {
    return false;
  } else {
    return customerData;
  }
};

const profileService = async (data) => {
  const customers = await customerSchema.find({ _id: data.id });
  if (!customers) {
    return false;
  } else {
    return customers;
  }
};

module.exports = {
  createService,
  loginService,
  profileService,
};
