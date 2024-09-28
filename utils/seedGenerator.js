function generateSeed(seed, page) {
  return `${seed}-${page}`;
}

module.exports = { generateSeed };