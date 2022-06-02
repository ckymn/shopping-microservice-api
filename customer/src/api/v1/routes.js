const express = require("express");
const router = express.Router();
const { create } = require("./controllers/customer.controllers");

router.get("/", create);

module.exports = router;
