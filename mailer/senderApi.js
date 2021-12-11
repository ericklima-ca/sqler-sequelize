const smtpConfig = require("./config");

const sendMailConfirmation = async (token) => {
  const user = await token.getUser();
  try {
    await smtpConfig.sendMail({
      from: '"Erick" email@email.com',
      to: user.email,
      subject: "Email confirmation",
      text: `Link for confirmation:
          https://test.com/auth/verify/${user.id}/${token.userToken}`,
    });
    console.log("Email send!");
  } catch (e) {
    console.log("Error", e);
  }
};

module.exports = sendMailConfirmation;
