const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "customer-service" },
  transports: [
    new winston.transports.File({
      filename: "src/api/v1/logs/customer/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "src/api/v1/logs/customer/info.log",
      level: "info",
    }),
    new winston.transports.File({
      filename: "src/api/v1/logs/customer/combined.log",
    }),
  ],
});

module.exports = logger;
