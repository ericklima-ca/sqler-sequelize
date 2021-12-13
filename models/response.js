const { Model } = require("sequelize/dist");

module.exports = (sequelize, DataTypes) => {
  class Response extends Model {
    static associate(models) {
      this.belongsTo(models.Solicitation);
      this.belongsTo(models.User);
    }
  }
  Response.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
        autoIncrement: true,
      },
      confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Response",
      timestamps: true,
    }
  );
  return Response;
};
