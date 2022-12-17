module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  setupFiles: ['<rootDir>/jest.setup.ts'],
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!lodash-es)'],
  coverageThreshold: {
    global: {
      branches: 20,
      functions: 25,
      lines: 45,
      statements: 45,
    },
  },
};
