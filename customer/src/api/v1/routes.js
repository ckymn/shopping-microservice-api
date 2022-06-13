const express = require("express");
const router = express.Router();
const { validate, auth } = require("./middleware");
const {
  createValidation,
  loginValidation,
  addressValidation,
  updateValidation,
  resetPasswordValidation,
} = require("./validations/customer.validation");

const {
  createController,
  profileController,
  loginController,
  addressController,
  updateController,
  resetPassword,
} = require("./controllers/customer.controller");

router.get("/customer/profile", auth, profileController);
router.post("/customer/signup", validate(createValidation), createController);
router.post("/customer/login", validate(loginValidation), loginController);
router.patch(
  "/customer/updateProfile",
  auth,
  validate(updateValidation),
  updateController
);
router.post(
  "/customer/address",
  auth,
  validate(addressValidation),
  addressController
);
router.patch(
  "/customer/reset-password",
  validate(resetPasswordValidation),
  resetPassword
);

module.exports = router;
