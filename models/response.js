const { Model } = require("sequelize/dist");

module.exports = (sequelize, DataTypes) => {
  class Response extends Model {
    static associate(models) {}
  }
  Response.init(
    {
      solicitationId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Solicitation",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.STRING,
        references: {
          model: "User",
          key: "enroll",
        },
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
