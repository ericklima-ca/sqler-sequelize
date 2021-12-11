const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      this.hasMany(models.Solicitation);
    }
  }
  Product.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
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
