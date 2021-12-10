const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Center extends Model {
    static associate(models) {}
  }
  Center.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      storeName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      warehouseEmail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      managementEmail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Center",
      timestamps: false,
    }
  );

  return Center;
};
