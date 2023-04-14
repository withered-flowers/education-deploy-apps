const fs = require("fs/promises");
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

(async () => {
  let data = generateData(10);
  await fs.writeFile("./data/dummy.json", JSON.stringify(data, null, 2));
})();
