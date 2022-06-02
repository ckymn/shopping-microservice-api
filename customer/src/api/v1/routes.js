const express = require("express");
const router = express.Router();
const { createController } = require("./controllers/customer.controller");

router.post("/customer/signup", createController);

module.exports = router;
