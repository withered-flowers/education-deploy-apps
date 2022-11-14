"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = require("../data/dummy.json");
    await queryInterface.bulkInsert("Users", data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null);
  },
};
