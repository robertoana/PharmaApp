const { faker } = require('@faker-js/faker');
const { medicineNames } = require('./medicineNames');

function generateMedicines(count = 5) {
  const medicines = [];

  for (let i = 0; i < count; i++) {
    medicines.push({
      name: faker.helpers.arrayElement(medicineNames),
      price: faker.commerce.price({ min: 5, max: 100, precision: 0.01 }),
      description: faker.commerce.productDescription(),
      manufacturer: faker.company.name(),
      dosage: faker.number.int({ min: 10, max: 100 }),
      quantity: faker.number.int({ min: 1, max: 100 }),
      expiryDate: faker.date.future(),
      stockLot: `Lot-${faker.number.int()}`,
    });
  }
  return medicines;
}

module.exports = { generateMedicines };

generateMedicines();
