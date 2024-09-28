const seedrandom = require("seedrandom");

function applyErrors(user, errors, seed) {
  if (errors <= 0) return user;

  const errorTypes = ["delete", "add", "swap"];
  const rng = seedrandom(seed);

  const randomChar = () => String.fromCharCode(97 + Math.floor(rng() * 26));

  // Helper function to apply a random error to a string
  const applyError = (str) => {
    const errorType = errorTypes[Math.floor(rng() * errorTypes.length)];
    const pos = Math.floor(rng() * str.length);

    switch (errorType) {
      case "delete":
        return str.slice(0, pos) + str.slice(pos + 1);
      case "add":
        return str.slice(0, pos) + randomChar() + str.slice(pos);
      case "swap":
        if (str.length < 2) return str;
        return str.slice(0, pos) + str[pos + 1] + str[pos] + str.slice(pos + 2);
      default:
        return str;
    }
  };

  let totalErrorsToApply = Math.floor(errors);
  const probabilityOfExtraError = errors - totalErrorsToApply;

  // Add one extra error probabilistically
  if (rng() < probabilityOfExtraError) {
    totalErrorsToApply += 1;
  }

  const fields = ["name", "address", "phone"];

  for (let i = 0; i < totalErrorsToApply; i++) {
    const field = fields[Math.floor(rng() * fields.length)];
    user[field] = applyError(user[field]);
  }

  return user;
}

module.exports = { applyErrors };