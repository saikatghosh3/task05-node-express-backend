const express = require("express");
const {
  getUsers,
  generateSeed,
} = require("../controllers/userGeneratorController");

const router = express.Router();

router.get("/", getUsers);
router.get("/generate-seed", generateSeed);

module.exports = router;
