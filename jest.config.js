module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__test__/**/*.test.ts"],
  moduleFileExtensions: ["ts", "js", "node"],
  clearMocks: true,
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts?$': ['ts-jest', {
      useESM: true,
    }],
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
      useESM: true,
    },
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jose)/)',
  ],
};