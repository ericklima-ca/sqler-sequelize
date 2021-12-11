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
  }
  Token.init(
    {
      id: {
        type: DataTypes.TEXT,
        primaryKey: true,
      },
    },
    {
      sequelize,
      timestamps: true,
      hooks: {
        beforeCreate: (token) => {
          const newToken = randomBytes(48).toString("hex");
          token.id = newToken;
        },
      },
    }
  );
  return Token;
};
