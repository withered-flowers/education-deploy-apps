"use strict";

const faker = require("faker");

const generateData = (len) => {
  let data = [];

  for (let ctr = 0; ctr < len; ctr++) {
    let objUser = {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      dob: faker.date.past(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    data.push(objUser);
  }

  return data;
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", generateData(10), {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null);
  },
};
