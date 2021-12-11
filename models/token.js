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
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userToken: {
        type: DataTypes.TEXT,
        unique: true,
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
