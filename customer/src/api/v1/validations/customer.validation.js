const Joi = require("joi");

const createValidation = Joi.object({
  email: Joi.string().email().required(),
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

const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(3),
});

const addressValidation = Joi.object({
  street: Joi.string().required(),
  postalCode: Joi.string(),
  country: Joi.string(),
  city: Joi.string(),
});

module.exports = {
  createValidation,
  loginValidation,
  addressValidation,
};
