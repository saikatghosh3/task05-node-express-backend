const { generateUserData } = require("../utils/dataGenerator");
const { applyErrors } = require("../utils/errorSimulator");
const { generateSeed } = require("../utils/seedGenerator");
const APIError = require("../utils/apiErrorClass");
exports.getUsers = (req, res) => {
  try {
    const { region, errors, seed, page } = req.query;
    if (!region) {
      throw new APIError(
        400,
        "region should not be empty, please pass region as query params"
      );
    }
    const seedValue = generateSeed(seed, page);
    let users = generateUserData(region, seedValue);

    users = users.map((user) => applyErrors(user, errors));
    res.json(users);
  } catch (e) {
    const status = e.status || 500;
    res.status(status).json({
      status: status,
      message: e && e.message ? e.message : "Something goes wrong",
    });
  }
};

exports.generateSeed = (req, res) => {
  try {
    const randomSeed = Math.floor(Math.random() * 1000000);
    res.json({ seed: randomSeed });
  } catch (e) {
    const status = e.status || 500;
    res.status(status).json({
      status: status,
      message: e && e.message ? e.message : "Something goes wrong",
    });
  }
};
