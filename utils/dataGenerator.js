const { faker } = require("@faker-js/faker");
const seedrandom = require("seedrandom");
const APIError = require("./apiErrorClass");
const { regions } = require("../configs/regions");

const supportedRegions = Object.keys(regions).join(", ");

function generateUserData(region, seed) {
  const users = [];
  const locale = regions[region];
  if (locale) {
    faker.setLocale(locale);
  } else {
    throw new APIError(
      400,
      `Locale for region "${region}" is not supported. Supported regions: ${supportedRegions}`
    );
  }

  const rng = seedrandom(seed);

  for (let i = 0; i < 20; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const address = `${faker.address.city()}, ${faker.address.streetAddress(
      true
    )}`;
    const phone = faker.phone.number();

    users.push({
      index: i + 1,
      id: Math.floor(rng() * 1000000),
      name: `${firstName} ${lastName}`,
      address: address,
      phone: phone,
    });
  }

  return users;
}

module.exports = { generateUserData };
