const smtpConfig = require("./config");
require("dotenv").config();

module.exports = async (token, req) => {
  const user = await token.getUser();
  try {
    await smtpConfig.sendMail({
      from: process.env.USER_GMAIL,
      to: user.email,
      subject: "Email confirmation",
      text: `Link for confirmation:
          ${req.protocol}://${req.hostname}:${process.env.PORT}/auth/verify/${user.id}/${token.userToken}`,
    });
    console.log("Email send!");
  } catch (e) {
    console.log("Error", e);
  }
};
