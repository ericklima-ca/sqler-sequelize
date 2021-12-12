const { Model } = require("sequelize");
const { randomBytes } = require("crypto");

module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate(models) {
      this.belongsTo(models.User);
    }

    expired() {
      const parsedTime = Date.parse(this.createdAt);
      const expireDate = parsedTime + 1000 * 60 * 60;
      return Date.now() > expireDate;
    }

    userConfirmed(token) {
      return token === this.userToken;
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
