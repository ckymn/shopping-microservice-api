const express = require("express");
const cors = require("cors");
const routes = require("../routes");
const HandleErrors = require("./errorHandler.utils");

module.exports = createServer = async (app) => {
  const app = express();
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(cors());
  app.use(express.static(__dirname + "/public"));

  //api
  routes(app);

  // error handling
  app.use(HandleErrors);

  return app;
};
