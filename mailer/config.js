const nodemailer = require("nodemailer");

const smtpConfig = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "",
    pass: "",
  },
});

module.exports = smtpConfig;
