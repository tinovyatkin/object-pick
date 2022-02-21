export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageProvider: 'v8',
  verbose: true,
  coverageReporters: ['text', 'json', 'cobertura', 'lcov'],
  moduleFileExtensions: ['ts', 'js'],
  extensionsToTreatAsEsm: ['.ts'],
  setupFilesAfterEnv: ['jest-extended/all'],
  watchPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.sonarlint/',
    '<rootDir>/dist/',
    '<rootDir>/coverage/',
    '<rootDir>/.vscode/',
  ],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};
