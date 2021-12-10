const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Solicitation extends Model {
    static associate(models) {}
  }
  Solicitation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      order: {
        type: DataTypes.STRING,
      },
      productId: {
        type: DataTypes.STRING,
        references: {
          key: "id",
          model: "Product",
        },
      },
      amount: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      centerId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Center",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.STRING,
        references: {
          model: "User",
          key: "id",
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
