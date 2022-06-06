const express = require("express");
const router = express.Router();
const { validate, auth } = require("./middleware");
const {
  createValidation,
  loginValidation,
  addressValidation,
} = require("./validations/customer.validation");

const {
  createController,
  profileController,
  loginController,
  addressController,
} = require("./controllers/customer.controller");

router.get("/customer/profile", auth, profileController);
router.post("/customer/signup", validate(createValidation), createController);
router.post("/customer/login", validate(loginValidation), loginController);
router.post(
  "/customer/address",
  auth,
  validate(addressValidation),
  addressController
);

module.exports = router;
