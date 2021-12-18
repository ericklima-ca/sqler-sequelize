(async () => {
  const { sequelize } = require("../models");
  await sequelize.sync({ force: true });
})();
