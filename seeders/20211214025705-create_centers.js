"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("Centers", [
      {
        id: "",
        storeName: "",
        warehouseEmail: "",
        managementEmail: "",
      },
      {
        id: "",
        storeName: "",
        warehouseEmail: "",
        managementEmail: "",
      },
      {
        id: "",
        storeName: "",
        warehouseEmail: "",
        managementEmail: "",
      },
      {
        id: "",
        storeName: "",
        warehouseEmail: "",
        managementEmail: "",
      },
      {
        id: "",
        storeName: "",
        warehouseEmail: "",
        managementEmail: "",
      },
      {
        id: "",
        storeName: "",
        warehouseEmail: "",
        managementEmail: "",
      },
      {
        id: "",
        storeName: "",
        warehouseEmail: "",
        managementEmail: "",
      },
      {
        id: "",
        storeName: "",
        warehouseEmail: "",
        managementEmail: "",
      },
      {
        id: "",
        storeName: "",
        warehouseEmail: "",
        managementEmail: "",
      },
      {
        id: "",
        storeName: "",
        warehouseEmail: "",
        managementEmail: "",
      },
      {
        id: "",
        storeName: "",
        warehouseEmail: "",
        managementEmail: "",
      },
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("Centers", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
