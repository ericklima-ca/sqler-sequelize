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
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      ean: {
        type: DataTypes.TEXT,
      },
      imageUrl: DataTypes.TEXT,
    },
    { sequelize, modelName: "Product", timestamps: false }
  );
  return Product;
};
