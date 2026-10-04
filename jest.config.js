const nextJest = require("next/jest")({ dir: "./" });

const createJestConfig = nextJest;

const customJestConfig = {
  testEnvironment: "node",
};

module.exports = createJestConfig(customJestConfig);