const { sequelize, User, Center, Token } = require("./models");

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
  // const center = await Center.create({
  //   id: '102',
  //   storeName: 'Bemol Online',
  //   warehouseEmail: 'bol@email.com',
  //   managementEmail: 'bolman@email.com'
  // });

  // const user = await User.create({
  //   name: 'Erick',
  //   lastName: 'Amorim',
  //   email: 'erick@email.com',
  //   password: 'ecal4321!',
  //   office: true,
  //   id: 14512
  // })
  // console.log(user.toJSON())

  // const tokenNew = await Token.create({
  //   UserId: 14512
  // })
  // console.log(tokenNew)

  const token = await Token.findOne({
    where: {
      UserId: 14512
    }
  })

  console.log(await token.getUser())

  // const user = await User.findOne({
  //   where: {
  //     id: 14510
  //   }
  // })

  // const check = await user.checkPassword('123123123');
  // console.log(check);

  // await sequelize.sync({ force: true })
})();