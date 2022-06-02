const customer = require("./controllers/customer.controllers");

module.exports = customerRoutes = (app) => {
  app.get("/", (req, res, next) => {
    res.status(200).send({
      status: "OK",
      message: "Main Page",
    });
  });
};
