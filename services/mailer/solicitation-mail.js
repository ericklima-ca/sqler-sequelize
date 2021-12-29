const smtpConfig = require("./config");
//require("dotenv").config();
const { Response, Solicitation } = require("../../models");

class SolicitationMailer {
  static async sendMail(id) {
    const solicitation = await Solicitation.findOne({
      where: {
        id: id,
      },
    });
    const response = await Response.findOne({
      where: {
        SolicitationId: solicitation.id,
      },
    });
    const obs = solicitation.obs;
    console.log(">>>" + obs);
    const center = await solicitation.getCenter();
    console.log(">>>" + center);

    const user = await response.getUser();
    console.log(">>>" + user);

    const to = `${user.email}, ${center.warehouseEmail}, ${center.managementEmail}`;
    const cc = `${process.env.LOG_EMAIL}, ${process.env.CS_EMAIL}`;
    const centerName = center.centerName;

    try {
      await smtpConfig.sendMail({
        from: process.env.USER_GMAIL,
        to: to,
        cc: cc,
        subject: `NF ${obs} | Enviar ao CD Manaus`,
        text: `
        Prezados,

        Por gentileza, enviar produto e NF ao CD.
        NF: ${obs}
        Centro: Loja ${centerName}.

        Reservado com ${user.name}.

        Desde já agradecemos.`,
      });
      console.log("Email sent");
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = SolicitationMailer;
