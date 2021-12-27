(async () => {
  const { sequelize } = require("../models");
  await sequelize.sync();
})();
