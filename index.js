const db = require("./models");
const sequelize = db.sequelize;

// Solicitation.hasOne(Product);
// Product.belongsTo(Solicitation, {
//     foreignKey: 'productId'
// });

// Solicitation.hasOne(User);
// User.belongsTo(Solicitation, {
//     foreignKey: 'userId'
// });

// Center.hasMany(User);
// User.belongsTo(Center);

// Response.hasOne(User);
// User.belongsTo(Response);

(async () => {
  await sequelize.sync();
})();
