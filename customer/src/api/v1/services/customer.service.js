const { customerSchema, customerAddress } = require("../models/customer.model");
const passwordToHash = require("../utils/helper.utils");

const createService = async (data) => {
  const customerData = new customerSchema(data);
  if (!customerData) {
    return false;
  } else {
    return customerData.save();
  }
};

const updateService = async (where, data) => {
  const update = await customerSchema.findOneAndUpdate(where, data, {
    new: true,
  });
  if (!update) {
    return false;
  } else {
    return update;
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
  const customers = await customerSchema.findOne({ _id: data.id }).populate({
    path: "address",
    select: "street postalCode country city -_id",
  });
  if (!customers) {
    return false;
  } else {
    return customers;
  }
};

const addressService = async (_id, data) => {
  const address = new customerAddress(data);
  await customerSchema.findOneAndUpdate(_id, {
    $push: {
      address: address._id,
    },
  });
  if (!address) {
    return false;
  } else {
    return address.save();
  }
};

module.exports = {
  createService,
  loginService,
  profileService,
  addressService,
  updateService,
};
