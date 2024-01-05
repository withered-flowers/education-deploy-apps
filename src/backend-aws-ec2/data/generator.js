const fs = require("node:fs/promises");
const { faker } = require("@faker-js/faker");

const generateData = (len) => {
  let data = [];

  for (let ctr = 0; ctr < len; ctr++) {
    let objUser = {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email().toLocaleLowerCase(),
      phone: faker.phone.number(),
      dob: faker.date.past(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    data.push(objUser);
  }

  return data;
};

(async () => {
  let data = generateData(10);
  await fs.writeFile("./data/dummy.json", JSON.stringify(data, null, 2));
})();
