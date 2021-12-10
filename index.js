const sequelize = require("./db/connection");
const Product = require('./models/product');
const User = require('./models/user');
const Response = require('./models/response');
const Solicitation = require('./models/solicitation');
const Center = require('./models/center');
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

    await sequelize.sync({ force: true })


})();
