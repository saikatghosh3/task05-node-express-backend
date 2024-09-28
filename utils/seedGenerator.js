function generateSeed(seed, page) {
  return Number(seed) + Number(page);
}

module.exports = { generateSeed };
