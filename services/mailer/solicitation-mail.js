//require("dotenv").config();
const fs = require("fs").promises;

const smtpConfig = require("./config");
const { Response, Solicitation } = require("../../models");

class SolicitationMailer {
  static async genTemplate(obj) {
    try {
      let data = await fs.readFile(__dirname + "/template.html", "utf-8");
      const mapping = {
        "{{order}}": obj.order,
        "{{centerName}}": obj.centerName.toUpperCase(),
        "{{centerId}}": obj.centerId,
        "{{responder}}": obj.responder,
        "{{requester}}": obj.requester,
        "{{nf}}": obj.nf,
      };
      const pattern =
        /{{order}}|{{centerName}}|{{centerId}}|{{responder}}|{{requester}}|{{nf}}/gi;
      let template = data.replace(pattern, (m) => {
        return mapping[m];
      });
      return template;
    } catch (e) {
      console.log(e);
    }
  }

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
    const obs = solicitation.obs.replace("/", "-");
    const center = await solicitation.getCenter();
    const user = await response.getUser();
    const to = `${user.email}, ${center.warehouseEmail}, ${center.managementEmail}`;
    const cc = `${process.env.LOG_EMAIL}, ${process.env.CS_EMAIL}`;

    const objEmail = {
      order: solicitation.order,
      centerName: center.centerName,
      centerId: center.id,
      responder: user.name,
      requester: (await solicitation.getUser()).name,
      nf: obs,
    };
    try {
      const htmlEmail = await SolicitationMailer.genTemplate(objEmail);
      await smtpConfig.sendMail({
        from: process.env.USER_GMAIL,
        to: to,
        cc: cc,
        subject: `NF ${obs} | Enviar ao CD Manaus`,
        html: htmlEmail,
        //   text: `
        //   Prezados,

        //   Por gentileza, enviar produto e NF ao CD.
        //   NF: ${obs}
        //   Centro: Loja ${centerName}.

        //   Reservado com ${user.name}.

        //   Desde já agradecemos.`,
        // });
      });
      console.log("Email sent");
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = SolicitationMailer;
