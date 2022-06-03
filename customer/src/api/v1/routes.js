const express = require("express");
const router = express.Router();
const { validate } = require("./middleware");
const { createValidation } = require("./validations/customer.validation");

const {
  createController,
  listController,
} = require("./controllers/customer.controller");

router.get("/customer/profile", listController);
router.post("/customer/signup", validate(createValidation), createController);

module.exports = router;
