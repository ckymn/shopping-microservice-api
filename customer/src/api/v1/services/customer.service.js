const BaseService = require("./Base.service");
const { customerSchema, customerAddress } = require("../models/customer.model");

class Customer extends BaseService {
  constructor() {
    super(customerSchema);
  }

  listOne(where) {
    const value = customerSchema.findOne(where).populate({
      path: "address",
      select: "street postalCode country city -_id",
    });
    if (!value) return false;
    return value;
  }

  addAdress(data) {
    const value = customerAddress.create(data);
    if (!value) return false;
    return value;
  }
}

module.exports = new Customer();
