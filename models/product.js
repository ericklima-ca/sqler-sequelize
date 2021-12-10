const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {}
  }
  Product.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ean: {
        type: DataTypes.STRING,
      },
      imageUrl: DataTypes.STRING,
    },
    { sequelize, modelName: "Product", timestamps: false }
  );
  return Product;
};
