const { faker } = require("@faker-js/faker");
const seedrandom = require("seedrandom");
const APIError = require("./apiErrorClass");
const { regions } = require("../configs/regions");

const supportedRegions = Object.keys(regions).join(", ");

function generateUserData(region, seed, page = 1, batchSize = 20) {
  const users = [];
  const locale = regions[region];

  if (!locale) {
    throw new APIError(
      400,
      `Locale for region "${region}" is not supported. Supported regions: ${supportedRegions}`
    );
  }

  // Set region-based locale
  faker.setLocale(locale);

  // Create a seeded random number generator
  const rng = seedrandom(seed + page);

  for (let i = 0; i < batchSize; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const address = `${faker.address.city()}, ${faker.address.streetAddress(
      true
    )}`;
    const phone = faker.phone.number();

    users.push({
      index: (page - 1) * batchSize + i + 1,
      id: Math.floor(rng() * 1000000),
      name: `${firstName} ${lastName}`,
      address: address,
      phone: phone,
    });
  }

  return users;
}

module.exports = { generateUserData };