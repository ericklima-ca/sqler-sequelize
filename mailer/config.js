const nodemailer = require("nodemailer");
require("dotenv").config();

const smtpConfig = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_GMAIL,
    pass: process.env.TOKEN_GMAIL,
  },
});

module.exports = smtpConfig;
