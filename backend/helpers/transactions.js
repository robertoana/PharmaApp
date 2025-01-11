const { faker } = require('@faker-js/faker');
const { medicineNames } = require('./medicineNames');

function generateTransactions(count = 10) {
  const transactions = [];

  for (let i = 0; i < count; i++) {
    const quantity = faker.number.int({ min: 1, max: 5 });
    const price = faker.commerce.price({ min: 5, max: 100, precision: 0.01 });
    transactions.push({
      medicine: {
        id: faker.string.uuid(),
        name: faker.helpers.arrayElement(medicineNames),
        quantity,
        price,
      },
      type: faker.helpers.arrayElement(['entry', 'exit']),
      transactionPrice: parseFloat(quantity * price).toFixed(2),
      transactionsDate: faker.date.recent(),
      userId: faker.string.uuid(),
    });
  }
  return transactions;
}

module.exports = { generateTransactions };
