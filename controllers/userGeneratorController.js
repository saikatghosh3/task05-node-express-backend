const { generateUserData } = require("../utils/dataGenerator");
const { applyErrors } = require("../utils/errorSimulator");
const { generateSeed } = require("../utils/seedGenerator");
const APIError = require("../utils/apiErrorClass");

exports.getUsers = (req, res) => {
  try {
    const { region, errors = 0, seed, page = 1 } = req.query;

    if (!region) {
      throw new APIError(400, "Region is required as query params.");
    }

    const batchSize = 20;
    const seedValue = generateSeed(seed, page);

    // Generate base user data
    let users = generateUserData(region, seedValue, page, batchSize);

    // Apply errors to each user
    users = users.map((user) => applyErrors(user, errors, seedValue));

    res.json(users);
  } catch (e) {
    const status = e.status || 500;
    res.status(status).json({
      status: status,
      message: e.message || "Something went wrong",
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
      message: e.message || "Something went wrong",
    });
  }
};