const { sequelize } = require('./models');
const app = require("./server/app/app");
require('dotenv').config();


app.listen(process.env.PORT, async () => {
  await sequelize.sync();
  console.log("listening in http://localhost:3000");
});
