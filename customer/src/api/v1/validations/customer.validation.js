const Joi = require("joi");

const createValidation = Joi.object({
  email: Joi.string().email().required().min(5),
  password: Joi.string().required().min(3),
  salt: Joi.string(),
  phone: Joi.string(),
  address: Joi.string(),
  cart: Joi.array().items({
    product: Joi.string(),
    unit: Joi.number(),
  }),
  wishlist: Joi.array(),
  orders: Joi.array(),
});

module.exports = {
  createValidation,
};
