"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Centers",
      [
        {
          id: 102,
          centerName: "BOL",
          warehouseEmail: "",
          managementEmail: "",
        },
        {
          id: 101,
          centerName: "Matriz",
          warehouseEmail: "",
          managementEmail: "",
        },
        {
          id: 103,
          centerName: "Avenida",
          warehouseEmail: "",
          managementEmail: "",
        },
        {
          id: 105,
          centerName: "Educandos",
          warehouseEmail: "",
          managementEmail: "",
        },
        {
          id: 106,
          centerName: "Shopping",
          warehouseEmail: "",
          managementEmail: "",
        },
        {
          id: 109,
          centerName: "Grande Circular",
          warehouseEmail: "",
          managementEmail: "",
        },
        {
          id: 114,
          centerName: "Ponta Negra",
          warehouseEmail: "",
          managementEmail: "",
        },
        {
          id: 115,
          centerName: "Cidade Nova",
          warehouseEmail: "",
          managementEmail: "",
        },
        {
          id: 116,
          centerName: "Studio 5",
          warehouseEmail: "",
          managementEmail: "",
        },
        {
          id: 117,
          centerName: "Millennium",
          warehouseEmail: "",
          managementEmail: "",
        },
        {
          id: 118,
          centerName: "Camapuã",
          warehouseEmail: "",
          managementEmail: "",
        },
        {
          id: 120,
          centerName: "Ponta Negra Shopping",
          warehouseEmail: "",
          managementEmail: "",
        },
        {
          id: 121,
          centerName: "Nova Cidade",
          warehouseEmail: "",
          managementEmail: "",
        },
        {
          id: 500,
          centerName: "Torquato",
          warehouseEmail: "",
          managementEmail: "",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Centers", null, {});
  },
};
