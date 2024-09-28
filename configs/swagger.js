const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

const swaggerDocPath = path.resolve(__dirname, "../swagger/index.yaml");
const loadedSpec = YAML.load(swaggerDocPath);

const swaggerSpec = {
  ...loadedSpec,
  servers: [
    {
      url: process.env.DNS_ADDRESS
        ? process.env.DNS_ADDRESS
        : "http://localhost:5000",
    },
  ],
};

module.exports = { swaggerSpec, swaggerUi };