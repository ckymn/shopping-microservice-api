const express = require("express");
const cors = require("cors");
const routes = require("../routes");
const HandleErrors = require("./errorHandler.utils");
const helmet = require("helmet");

module.exports = createServer = () => {
  const app = express();

  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(helmet());
  app.use(cors());

  //api
  routes(app);

  // error handling
  app.use(HandleErrors);

  return app;
};
