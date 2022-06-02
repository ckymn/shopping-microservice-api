const express = require("express");
const router = express.Router();
const {
  createController,
  listController,
} = require("./controllers/customer.controller");

router.post("/customer/signup", createController);
router.get("/customer/profile", listController);

module.exports = router;
