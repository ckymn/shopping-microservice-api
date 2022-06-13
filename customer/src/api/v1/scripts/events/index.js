const eventEmitter = require("./eventEmitter");
const nodemailer = require("nodemailer");

module.exports = () => {
  eventEmitter.on("send_email", async (data) => {
    let trasporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    let info = await trasporter.sendMail({
      from: process.env.EMAIL_FROM,
      ...data,
    });

    console.log("Message sent  = ", info.messageId);
    console.log("Preview URL = ", nodemailer.getTestMessageUrl(info));
  });
};
