const { customerOrder, customerProduct } = require("../models/customer.model");

const orderService = async (data) => {
  const order = new customerOrder(data);
  if (!order) {
    return false;
  } else {
    return order.save();
  }
};

const productService = async (data) => {
  const product = new customerProduct(data);
  if (!product) {
    return false;
  } else {
    return product.save();
  }
};

module.exports = {
  orderService,
  productService,
};
