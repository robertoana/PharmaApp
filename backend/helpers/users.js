const { faker } = require('@faker-js/faker');

function generateUsers(count = 1) {
  const users = [];

  for (let i = 0; i < count; i++) {
    users.push({
      name: `${faker.person.firstName()} ${faker.person.lastName()}`,
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
  }
  return users;
}

module.exports = { generateUsers };
