const Joi = require("joi");

const createValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(3),
  salt: Joi.string(),
  phone: Joi.string(),
  address: Joi.array(),
  cart: Joi.array().items({
    product: Joi.string(),
    unit: Joi.number(),
  }),
  wishlist: Joi.array(),
  orders: Joi.array(),
});

const updateValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(3),
  phone: Joi.string(),
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
  updateValidation,
  loginValidation,
  addressValidation,
};
