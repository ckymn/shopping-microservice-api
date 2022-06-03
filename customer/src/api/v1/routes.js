const express = require("express");
const router = express.Router();
const { validate, auth } = require("./middleware");
const {
  createValidation,
  loginValidation,
} = require("./validations/customer.validation");

const {
  createController,
  profileController,
  loginController,
} = require("./controllers/customer.controller");

router.get("/customer/profile", auth, profileController);
router.post("/customer/signup", validate(createValidation), createController);
router.post("/customer/login", validate(loginValidation), loginController);

module.exports = router;
