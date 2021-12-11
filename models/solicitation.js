const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Solicitation extends Model {
    static associate(models) {
      this.belongsTo(models.Product);
      this.belongsTo(models.User, {
        allowNull: false,
      });
      this.belongsTo(models.Center);
      this.hasOne(models.Response);
    }
  }
  Solicitation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
        autoIncrement: true,
      },
      order: {
        type: DataTypes.STRING,
      },
      amount: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        validate: {
          isInt: true,
        },
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
        validate: {
          isIn: [["pending", "processing", "finished"]],
        },
      },
      obs: {
        type: DataTypes.TEXT,
      },
    },
    { sequelize, modelName: "Solicitation", timestamps: true }
  );
  return Solicitation;
};
