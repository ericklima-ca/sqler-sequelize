const { Model } = require("sequelize");
const { randomBytes } = require("crypto");

const smtpConfig = require("../mailer/config");
require("dotenv").config();

module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate(models) {
      this.belongsTo(models.User);
    }

    async sendMailToken(req) {
      const user = await this.getUser();
      let subject = "E-mail confirmation";
      let link = `${req.protocol}://${req.hostname}:${process.env.PORT}/api/auth/verify/${user.id}/${this.userToken}`;
      if (req.baseUrl === "/recovery") {
        subject = "Recovery confirmation";
        link = `${req.protocol}://${req.hostname}:${process.env.PORT}/api/auth/recovery/${user.id}/${this.userToken}`;
      }
      try {
        await smtpConfig.sendMail({
          from: process.env.USER_GMAIL,
          to: user.email,
          subject: subject,
          text: `Link for confirmation:
          ${link}`,
        });
        console.log("Email send!");
      } catch (e) {
        console.log("Error", e);
      }
    }

    expired() {
      const parsedTime = Date.parse(this.createdAt);
      const expireDate = parsedTime + 1000 * 60 * 60;
      const result = Date.now() > expireDate;
      if (result) {
        this.destroy();
      }
      return result;
    }

    checkUser(token) {
      const result = token === this.userToken;
      if (result) {
        this.destroy();
      }
      return result;
    }
  }
  Token.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userToken: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      timestamps: true,
      hooks: {
        beforeCreate: (token) => {
          const newToken = randomBytes(24).toString("hex");
          token.userToken = newToken;
        },
      },
    }
  );
  return Token;
};
