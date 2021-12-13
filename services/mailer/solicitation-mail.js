const smtpConfig = require("./config");
require("dotenv").config();
const { Response } = require("../../models");

class SolicitationMailer {
  static async sendMail(solicitation) {
    const response = await Response.findOne({
      where: {
        SolicitationId: solicitation.id,
      },
    });
    const obs = solicitation.obs;
    const center = await solicitation.getCenter();
    const user = await response.getUser();
    const to = `${user.email}, ${center.warehouseEmail}, ${center.managementEmail}`;
    const centerName = center.storeName;

    await smtpConfig.sendMail({
      from: process.env.USER_GMAIL,
      to: to,
      subject: `Send to Distribution Center | NF ${obs}`,
      text: `${obs} | Center: ${centerName}`,
    });
  }
}

module.exports = SolicitationMailer;
